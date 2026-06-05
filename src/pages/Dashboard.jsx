import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const { loggedUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [editingTask, setEditingTask] =
    useState(null);

  const getTasks = async () => {

    try {

      const res = await API.get("/tasks");

      setTasks(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    if (loggedUser){
      getTasks();
    } else{
      alert("Please login to view your dashboard.");
      navigate("/");
    }
    
  }, []);

  const createTask = async (taskData) => {

    try {

      await API.post("/tasks", taskData);

      getTasks();

    } catch (error) {

      console.log(error);
    }
  };

  const updateTask = async (taskData) => {

    try {

      await API.put(`/tasks/${editingTask._id}`,taskData);

      setEditingTask(null);

      getTasks();

    } catch (error) {

      console.log(error);
    }
  };

  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      getTasks();

    } catch (error) {

      console.log(error);
    }
  };

  const toggleStatus = async (task) => {

    try {

      await API.put(
        `/tasks/${task._id}`,
        {
          status:
            task.status === "pending"
              ? "completed"
              : "pending"
        }
      );

      getTasks();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-purple-50">

      <div
        className="max-w-7xl mx-auto px-4 py-8"
      >

        <div
          className="grid lg:grid-cols-3 gap-8"
        >

          {/* Form Section */}

          <div className="lg:col-span-1">

            <TaskForm
              task={editingTask}
              onSubmit={
                editingTask
                  ? updateTask
                  : createTask
              }
              onCancel={() =>
                setEditingTask(null)
              }
            />

          </div>

          {/* Tasks Section */}

          <div className="lg:col-span-2">

            <div
              className="flex items-center justify-between mb-6"
            >

              <h1
                className="text-3xl font-bold text-purple-700"
              >
                Your Tasks
              </h1>

              <span
                className=" bg-purple-100 text-purple-700 px-4 py-2 rounded-2xl font-semibold"
              >
                {tasks.length} Tasks
              </span>

            </div>

            {
              tasks.length === 0 ? (

                <div
                  className="bg-white rounded-3xl p-10 text-center shadow-md"
                >

                  <h2
                    className="text-2xl font-bold text-slate-700"
                  >
                    No Tasks Found
                  </h2>

                  <p className="mt-2 text-slate-500">
                    Create your first task.
                  </p>

                </div>

              ) : (

                <div
                  className="grid md:grid-cols-2 gap-6"
                >

                  {
                    tasks.map((task) => (

                      <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={() =>setEditingTask(task)}
                        onDelete={() =>deleteTask(task._id)}
                        onToggle={() =>toggleStatus(task)}
                      />

                    ))
                  }

                </div>

              )
            }

          </div>

        </div>

      </div>

    </div>
  );
}