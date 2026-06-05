import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Login() {

  const navigate = useNavigate();
  const context = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {

    const res = await API.post(
      "/auth/login",
      form
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    context.setUserData(res.data.user);
    navigate("/dashboard");
  };

  return (

    <div className="min-h-screen flex items-center justify-center  px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-full max-w-md backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-purple-100"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-2 text-purple-700 tracking-wide">
            🔑 Login
          </h1>
          <p className="text-sm text-gray-600">
            If you don't have an account, please{" "}
            <Link to="/register" className="font-semibold text-purple-700 hover:underline">
              register
            </Link>
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          <input
            type="email"
            placeholder="✉️ Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-purple-300 rounded-2xl px-4 py-3 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-400 transition"
          />

          <input
            type="password"
            placeholder="🔒 Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-purple-300 rounded-2xl px-4 py-3 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-400 transition"
          />

          <button
            className="w-full bg-purple-700 text-white py-3 rounded-2xl font-semibold hover:bg-purple-800 shadow-md hover:shadow-lg transition"
          >
            Login
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-slate-600">
          Don't have an account?
          <Link to="/register" className="text-purple-700 font-semibold ml-1 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>

  );
}