export default function TaskCard({ task, onEdit, onDelete, onToggle }) {
  const completed = task.status === "completed";

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              completed
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {task.status}
          </span>

          <h2
            className={`mt-4 text-xl font-bold ${
              completed ? "line-through text-slate-400" : "text-slate-800"
            }`}
          >
            {task.title}
          </h2>
          
        </div>

        <button
          onClick={onToggle}
          className="bg-purple-100 text-purple-700 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-purple-200"
        >
          {completed ? "Mark Incomplete" : "Mark Completed"}
        </button>
      </div>
      <p className="mt-4 text-slate-600">{task.description}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={onEdit}
          className="bg-purple-700 text-white px-4 py-2 rounded-xl font-semibold hover:bg-purple-800"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="bg-red-100 text-red-700 px-4 py-2 rounded-xl font-semibold hover:bg-red-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
