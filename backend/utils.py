import requests
import pandas as pd
import numpy as np
import joblib

# Load trained model
model = joblib.load("model/cf_rating_model.pkl")

WINDOW_SIZE = 10


# ==============================
# 1️⃣ Fetch Codeforces Data
# ==============================
def fetch_user_data(handle):
    url = f"https://codeforces.com/api/user.rating?handle={handle}"
    response = requests.get(url)
    data = response.json()

    if data["status"] != "OK":
        return None

    df = pd.DataFrame(data["result"])

    if len(df) < WINDOW_SIZE:
        return None

    # Sort properly by time
    df = df.sort_values("ratingUpdateTimeSeconds").reset_index(drop=True)

    # Calculate rating change
    df["rating_change"] = df["newRating"] - df["oldRating"]

    return df


# ==============================
# 2️⃣ Build Model Features
# ==============================
def build_features(df):
    window = df.iloc[-WINDOW_SIZE:]

    features = []

    # Last 10 old ratings
    features.extend(window["oldRating"].values)

    # Last 10 ranks
    features.extend(window["rank"].values)

    # Last 10 rating changes
    features.extend(window["rating_change"].values)

    # Extra statistical features
    features.append(window["oldRating"].mean())
    features.append(window["oldRating"].max())
    features.append(window["oldRating"].min())
    features.append(window["rank"].mean())
    features.append(window["rank"].std())
    features.append(window["rating_change"].mean())

    return np.array(features).reshape(1, -1)


# ==============================
# 3️⃣ Predict Next Contest Rating
# ==============================
def predict_next_rating(handle):
    df = fetch_user_data(handle)
    if df is None:
        return None

    features = build_features(df)

    predicted_change = model.predict(features)[0]

    last_rating = df.iloc[-1]["newRating"]

    predicted_rating = last_rating + predicted_change

    return round(predicted_rating, 2)


# ==============================
# 4️⃣ Forecast Multiple Contests
# ==============================
def forecast_rating(handle, months=6):
    df = fetch_user_data(handle)
    if df is None:
        return None

    predictions = []

    for _ in range(months):
        features = build_features(df)
        predicted_change = model.predict(features)[0]

        last_rating = df.iloc[-1]["newRating"]
        predicted_rating = last_rating + predicted_change

        predictions.append(round(predicted_rating, 2))

        # Simulate next contest for rolling window
        new_row = {
            "contestId": -1,
            "rank": df["rank"].mean(),  # approximate
            "oldRating": last_rating,
            "newRating": predicted_rating,
            "rating_change": predicted_change,
            "ratingUpdateTimeSeconds": df["ratingUpdateTimeSeconds"].max() + 1
        }

        df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)

    return {
        "current_rating": int(df.iloc[-months-1]["newRating"]),
        "forecast": predictions
    }
