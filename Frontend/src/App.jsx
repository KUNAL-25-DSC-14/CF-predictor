import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Codeforces from "./pages/Codeforces";
import bg from "./assets/bg-code1.jpg";

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="min-h-screen bg-black/60">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/codeforces" element={<Codeforces />} />
        </Routes>

      </div>
    </div>
  );
}

export default App;
