import { Calendar, ClipboardList, X, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function TaskView({ task, onClose }) {
  if (!task) return null;

  const statusColors = {
    completed: "bg-green-100 text-green-700 border-green-300",
    "in-progress": "bg-yellow-100 text-yellow-700 border-yellow-300",
    pending: "bg-gray-100 text-gray-700 border-gray-300",
  };

  const statusIcons = {
    completed: <CheckCircle className="inline w-4 h-4 mr-1" />,
    "in-progress": <Clock className="inline w-4 h-4 mr-1" />,
    pending: <AlertCircle className="inline w-4 h-4 mr-1" />,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-5 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Task Details
          </h2>
          <button
            onClick={onClose}
            className="text-white bg-white/20 hover:bg-white/30 rounded-full p-1"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-gray-800">
          {/* Title */}
          <div>
            <h3 className="text-2xl font-bold mb-1">{task.title}</h3>
            <span
              className={`inline-flex items-center px-2 py-1 text-sm font-medium rounded-full border ${statusColors[task.status]}`}
            >
              {statusIcons[task.status]} {task.status}
            </span>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-700 leading-relaxed">
              {task.description || (
                <span className="italic text-gray-500">No description provided.</span>
              )}
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Due:</span>
              <span className="text-sm text-gray-700">
                {task.due_date ? new Date(task.due_date).toLocaleDateString() : "N/A"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Created:</span>
              <span className="text-sm text-gray-700">
                {new Date(task.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">Last Updated:</span>
            <span className="text-sm text-gray-700">
              {new Date(task.updated_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
