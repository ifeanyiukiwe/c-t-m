import { useState, useEffect, useRef } from "react";
import TaskItem from "./components/TaskItem";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputs, setInputs] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const inputRef = useRef(null);
  const API_URL = "http://localhost:5000/tasks";

  // Fetch tasks from backend on load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(API_URL);
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (!inputs.trim()) return;
    try {
      const res = await axios.post(API_URL, { text: inputs });
      setTasks([res.data, ...tasks]);
      setInputs("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Update task
  const updateTask = async (id, newText) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, { text: newText });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Click outside to trigger addTask
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        addTask();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputs]);

  const getBgClass = () => {
    return darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800";
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 p-6 ${getBgClass()}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">BestTask Manager</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded cursor-pointer transition ${
            darkMode ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Task Input */}
      <div className="flex gap-2 mb-4" ref={inputRef}>
        <input
          type="text"
          placeholder="Enter a new task"
          value={inputs}
          onChange={(e) => setInputs(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
          className="flex-1 px-4 py-2 rounded border focus:outline-none focus:ring-2"
        />
        <button
          onClick={addTask}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition cursor-pointer"
        >
          Add Task
        </button>
      </div>

      {/* Tasks */}
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Start by adding one!</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onDelete={deleteTask}
            onUpdate={updateTask}
            darkMode={darkMode}
          />
        ))
      )}
    </div>
  );
}

export default App;
