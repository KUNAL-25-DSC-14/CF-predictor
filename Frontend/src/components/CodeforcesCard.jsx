import { Link } from "react-router-dom";
import codeforces from "../assets/codeforces.jpg";

function CodeforcesCard() {
  return (
    <Link to="/codeforces">
      <div className="cursor-pointer hover:scale-105 transition">
        <div className="flex items-center gap-6 px-10 py-6 bg-black/60 rounded-xl backdrop-blur-md">
          <img src={codeforces} alt="Codeforces Logo" className="w-14 h-14" />
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Codeforces Rating Predictor
            </h2>
            <p className="text-gray-300 text-sm">
              Predict your next 6 months progress
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CodeforcesCard;
