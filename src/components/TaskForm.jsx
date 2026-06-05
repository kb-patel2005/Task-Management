import { useEffect, useState } from "react";

export default function TaskForm({
  task = null,
  onSubmit,
  onCancel
}) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {

    if (task) {

      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);

    } else {

      setTitle("");
      setDescription("");
      setStatus("pending");
    }

  }, [task]);

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit({title, description, status});
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-3xl shadow-lg space-y-5"
    >

      <h2 className="text-2xl font-bold text-purple-700">
        {task ? "Edit Task" : "Create Task"}
      </h2>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-purple-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-600"

      />

      <textarea
        rows="4"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-purple-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-600"

      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
       className="w-full border border-purple-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-600"

      >
        <option value="pending">
          Pending
        </option>

        <option value="completed">
          Completed
        </option>

      </select>

      <div className="flex flex-col sm:flex-row gap-3">

        <button
          type="submit"
          className="flex-1 bg-purple-700 text-white py-3 rounded-2xl font-semibold hover:bg-purple-800 transition"

        >
          {task ? "Update Task" : "Add Task"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-purple-300 text-purple-700 py-3 rounded-2xl font-semibold hover:bg-purple-100 transition"

        >
          Cancel
        </button>

      </div>

    </form>
  );
}