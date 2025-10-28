export default function TaskList({ tasks, onDelete, onEdit, onView }) {
  if (tasks.length === 0)
    return <p className="text-gray-500 text-center">No tasks found.</p>;

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white shadow p-3 rounded-lg flex justify-between items-center border"
        >
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-1">
              {task.description}
            </p>
          </div>

          <div className="space-x-2">
            <button
              onClick={() => onView(task)}
              className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
            >
              View
            </button>
            <button
              onClick={() => onEdit(task)}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
