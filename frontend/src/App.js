import { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await fetchTasks();
    setTasks(data);
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await createTask({ title, status: "pending" });
    setTitle("");
    loadTasks();
  }

  async function handleToggle(task) {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    await updateTask(task.id, { status: newStatus });
    loadTasks();
  }

  async function handleDelete(id) {
    await deleteTask(id);
    loadTasks();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

      <form onSubmit={handleAdd} className="mb-6 flex gap-2">
        <input
          className="border p-2 rounded w-64"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      <ul className="bg-white rounded shadow p-4 w-80">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span
              className={`cursor-pointer ${
                task.status === "completed" ? "line-through text-gray-500" : ""
              }`}
              onClick={() => handleToggle(task)}
            >
              {task.title}
            </span>
            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
