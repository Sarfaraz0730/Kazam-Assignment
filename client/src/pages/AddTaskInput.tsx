import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Task {
  _id: string;
  title: string;
  status: "pending" | "completed";
}

const TaskManager = () => {
  const { userId } = useParams<{ userId: string }>(); 
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [editingTask, setEditingTask] = useState<{ id: string; title: string } | null>(null);


  const authToken = localStorage.getItem("authToken");

  
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };

 
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/getAllTheTask/${userId}`, config);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (userId) fetchTasks();
  }, [userId]);

  // Add a task
  const handleAddTask = async () => {
    if (!taskTitle.trim()) return;
    try {
      await axios.post("http://localhost:8000/input", { title: taskTitle, userId }, config);
      setTaskTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Edit a task
  const handleEditTask = async () => {
    if (!editingTask?.title.trim()) return;
    try {
      await axios.patch(`http://localhost:8000/EditTask/${editingTask.id}`, { title: editingTask.title }, config);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`http://localhost:8000/DeleteTask/${taskId}`, config);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

//toggle
  const handleToggleStatus = async (taskId: string, currentStatus: "pending" | "completed") => {
    console.log("Toggle Button Clicked - Task ID:", taskId);

    try {
      const newStatus = currentStatus === "pending" ? "completed" : "pending";

    
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );

 
      await axios.patch(`http://localhost:8000/MarkTask/${taskId}`, { status: newStatus }, config);

  
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
 
      fetchTasks();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 text-left mb-4">Kazam Task Manager</h2>

        {/* Task Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter task..."
            className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task._id} className="flex justify-between items-center bg-gray-200 p-3 rounded-md">
              {editingTask?.id === task._id ? (
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className={`text-sm ${task.status === "completed" ? "line-through text-gray-500" : "text-black"}`}>
                  {task.title}
                </span>
              )}

              <div className="flex gap-2">
                {editingTask?.id === task._id ? (
                  <button
                    onClick={handleEditTask}
                    className="px-3 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingTask({ id: task._id, title: task.title })}
                    className="px-3 py-1 text-xs bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleToggleStatus(task._id, task.status)}
                  className={`px-3 py-1 text-xs rounded-md ${
                    task.status === "pending"
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-500 text-white hover:bg-gray-600"
                  }`}
                >
                  {task.status === "pending" ? "Complete" : "Undo"}
                </button>

                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManager;
