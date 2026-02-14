from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from utils import forecast_rating

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserRequest(BaseModel):
    handle: str


@app.post("/forecast")
def forecast(user: UserRequest):
    result = forecast_rating(user.handle)

    if result is None:
        return {"error": "User not found or insufficient contests"}

    return result
