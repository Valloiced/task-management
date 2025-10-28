import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskEdit from "./components/TaskEdit";
import TaskView from "./components/TaskView";

const API_URL = "https://task-management-64ds.onrender.com/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create new task
  const addTask = async (task) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      fetchTasks();
    } catch {
      setError("Failed to add task.");
    }
  };

  // Update task
  const updateTask = async (id, updatedTask) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      setEditingTask(null);
      fetchTasks();
    } catch {
      setError("Failed to update task.");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch {
      setError("Failed to delete task.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>

      {editingTask ? (
        <TaskEdit
          task={editingTask}
          onUpdate={updateTask}
          onCancel={() => setEditingTask(null)}
        />
      ) : (
        <TaskForm onAdd={addTask} />
      )}

      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onEdit={setEditingTask}
        onView={setViewingTask}
      />

      {viewingTask && (
        <TaskView task={viewingTask} onClose={() => setViewingTask(null)} />
      )}
    </div>
  );
}

export default App;
