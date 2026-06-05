import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Register() {

  const navigate = useNavigate();
  const context = useContext(UserContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const res = await API.post(
        "/auth/register",
        form
      );

      context.setUserData(res.data.user);
      navigate("/dashboard");
    } catch (error) {
      alert("something went wrong sorry not able to signup now.")
    }

  };

  return (

    <div
      className="min-h-screen flex items-center justify-center px-4"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold mb-1.5 text-purple-700"
          >
            Register
          </h1>
          <p className="text-sm text-gray-500">
            If you already have an account, please{" "}
            <Link
              to="/"
              className="font-semibold hover:underline"
            >
              login
            </Link>
          </p>
        </div>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Name"
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
            className="w-full border border-purple-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-600"
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
            className="w-full border border-purple-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-600"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
            className="w-full border border-purple-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-600"
          />

          <button
            className="w-full bg-purple-700 text-white py-3 rounded-2xl font-semibold hover:bg-purple-800"
          >
            Register
          </button>
          <div className="text-center text-sm text-purple-600">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="font-semibold hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}