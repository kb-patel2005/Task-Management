import { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { UserContext } from "../context/UserContext";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const { loggedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [editingTask, setEditingTask] = useState(null);

  const getTasks = async (pageNum = 1, searchTerm = search) => {
    try {
      const res = await API.get(`/tasks?page=${pageNum}&limit=6&search=${searchTerm}`);

      setTasks(res.data.tasks || []);
      setPage(res.data.currentPage || 1);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loggedUser) {
      getTasks();
    } else {
      alert("Please login to view your dashboard.");
      navigate("/");
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    getTasks(1, search);
  };

  const createTask = async (taskData) => {
    try {
      const task = await API.post("/tasks", taskData);
      setTasks([...tasks,task.data]);
      getTasks(page);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (taskData) => {
    try {
      await API.put(`/tasks/${editingTask._id}`, taskData);
      setEditingTask(null);
      getTasks(page);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      getTasks(page);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleStatus = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        status: task.status === "pending" ? "completed" : "pending",
      });
      getTasks(page);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? updateTask : createTask}
              onCancel={() => setEditingTask(null)}
            />
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-purple-700">Your Tasks</h1>
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-2xl font-semibold">
                {tasks.length} Tasks
              </span>
            </div>

            <form onSubmit={handleSearch} className="mb-6 flex space-x-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Search
              </button>
            </form>

            {tasks.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center shadow-md">
                <h2 className="text-2xl font-bold text-slate-700">No Tasks Found</h2>
                <p className="mt-2 text-slate-500">Try adjusting your search or create a new task.</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {tasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onEdit={() => setEditingTask(task)}
                      onDelete={() => deleteTask(task._id)}
                      onToggle={() => toggleStatus(task)}
                    />
                  ))}
                </div>

                <div className="flex justify-center mt-6 space-x-2">
                  <button
                    disabled={page === 1}
                    onClick={() => getTasks(page - 1)}
                    className="px-4 py-2 bg-purple-200 text-purple-700 rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page === totalPages}
                    onClick={() => getTasks(page + 1)}
                    className="px-4 py-2 bg-purple-200 text-purple-700 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
