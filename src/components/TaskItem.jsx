import React, { useState, useEffect, useRef } from "react";

function TaskItem({ task, onDelete, onUpdate, darkMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text || "");
  const inputRef = useRef(null);

  const handleSave = () => {
    if (!editedText.trim()) return;
    onUpdate(task._id, editedText);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isEditing &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        handleSave();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing, editedText]);
  return (
    <div
      className={`flex items-center justify-between p-3 mb-2 rounded border ${
        darkMode ? "border-gray-700" : "border-gray-300"
      }`}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          className="flex-1 px-3 py-2 mr-2 rounded border focus:outline-none"
        />
      ) : (
        <span className="flex-1">{task.text}</span>
      )}

      {isEditing ? (
        <div className="sm:flex">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white w-[70px] h-[40px] px-3 py-1 flex items-center mb-2 rounded hover:bg-blue-600 mr-2 cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditedText(task.text); // 🔁 Reset to original text
            }}
            className="bg-gray-400 text-white w-[70px] h-[40px] px-3 py-1 rounded hover:bg-gray-500 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2 cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default TaskItem;
