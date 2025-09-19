import React, { useState, useEffect, useRef } from "react";

function TaskItem({ task, onDelete, onUpdate, darkMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.title || "");
  const inputRef = useRef(null);

  // Save the updated task
  const handleSave = () => {
    const trimmed = editedText.trim();
    if (!trimmed || trimmed === task.title) {
      setIsEditing(false);
      return;
    }
    onUpdate(task._id, trimmed);
    setIsEditing(false);
  };

  // Cancel edit
  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(task.title);
  };

  // Click outside to save
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

  // Keyboard handlers
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <div
      className={`flex items-center justify-between p-3 mb-2 rounded border ${
        darkMode
          ? "border-gray-700 bg-gray-800 text-white"
          : "border-gray-300 bg-white"
      }`}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-3 py-2 mr-2 rounded border focus:outline-none"
        />
      ) : (
        <span className="flex-1">{task.title}</span>
      )}

      {isEditing ? (
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
