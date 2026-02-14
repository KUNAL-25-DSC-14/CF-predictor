import { NavLink } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="w-full px-10 py-4 bg-linear-to-r from-blue-800 to-indigo-900 text-white">
      <div className="flex items-center justify-between">

        {/* Left */}
        <h1 className="text-xl font-semibold tracking-wide">
          Kunal Singh
        </h1>

        {/* Center */}
        <div className="flex gap-10 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition ${
                isActive ? "text-green-400" : "hover:text-gray-300"
              }`
            }
          >
            Home
          </NavLink>

          <a
            href="https://drive.google.com/file/d/1d-73YrR9uitnpfBktrUVTyI91TF5_zUF/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            Resume
          </a>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/kunal-singh-39a16932a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-gray-300 transition"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://www.instagram.com/kunaal.cxx/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-gray-300 transition"
          >
            <FaInstagram />
          </a>

          <a
            href="mailto:imkkunal@gmail.com"
            className="text-xl hover:text-gray-300 transition"
          >
            <FaEnvelope />
          </a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
