import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center  px-6">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        <div className="text-left space-y-6">
          <h1 className="sm:text-5xl text-3xl font-extrabold text-purple-800">
            Manage Your Tasks Effortlessly
          </h1>
          <p className="sm:text-lg text-sm text-slate-700 leading-relaxed">
            Stay organized and boost your productivity with our task management
            system. Track progress, collaborate with your team, and achieve your
            goals — all in one place.
          </p>
          <button 
            className="bg-purple-700 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-purple-800 transition shadow-md"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>

        <div className="flex justify-center">
          <img
            src="https://img.freepik.com/free-vector/task-management-concept-illustration_114360-1085.jpg"
            alt="Task Management"
            className="rounded-3xl shadow-2xl w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
}
