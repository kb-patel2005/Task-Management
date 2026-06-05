import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { loggedUser, clearUserData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    clearUserData();
    navigate("/");
  };

  return (
    <nav className="bg-purple-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="https://play-lh.googleusercontent.com/jf1LX3ddEM1bsjz-5myvBnWQ5TLCKmUJeMRL7iFAVEK7cCPFovbS5iVuqVVZ5GFV4BA=s180-rw"
            alt="Logo"
            className="w-12 h-12 inline-block mr-2 rounded-full"
          />
        </h1>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/dashboard" className="hover:text-purple-300 transition flex items-center">
            <div className="text-xl">🧾</div>
            <div className="text-sm">Dashboard</div>
          </Link>

          <Link to="/register" className="hover:text-purple-300 flex items-center transition">
            <div className="text-xl">👤</div>
            <div className="text-sm">Register</div>
          </Link>

          {loggedUser && (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 bg-purple-600 text-white flex items-center justify-center font-semibold hover:bg-purple-800 transition rounded-full"
              >
                {loggedUser?.name?.charAt(0).toUpperCase() || "?"}
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200">
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
                    <div className="w-10 h-10 bg-purple-700 text-white flex items-center justify-center rounded-full font-bold">
                      {loggedUser?.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="font-semibold text-purple-700">
                        {loggedUser?.name || "Guest"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {loggedUser?.email || "guest@example.com"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-purple-700 font-semibold hover:bg-purple-100 transition rounded-b-xl"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="bg-purple-600 px-3 py-2 rounded-lg"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden fixed top-0 right-0 h-full w-64 bg-purple-700 text-white shadow-lg transform transition-transform duration-300 translate-x-0">
          <div className="flex flex-col items-start p-6 space-y-6">
            <div className="cursor-pointer text-2xl" onClick={()=>setOpen(!open)}> × </div>
            {loggedUser && (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 text-white flex items-center justify-center rounded-full font-bold">
                    {loggedUser?.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="font-semibold">{loggedUser?.name}</p>
                    <p className="text-sm text-gray-300">{loggedUser?.email}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-100 transition"
                >
                  🚪 Logout
                </button>
              </>
            )}
            <Link to="/dashboard" className="hover:text-purple-300 transition flex items-center">
              🧾 <span className="ml-2">Dashboard</span>
            </Link>
            <Link to="/register" className="hover:text-purple-300 transition flex items-center">
              👤 <span className="ml-2">Register</span>
            </Link>

          </div>
        </div>
      )}
    </nav>

  );
}
