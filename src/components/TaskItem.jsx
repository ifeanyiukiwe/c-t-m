// // // import React, { useState, useEffect, useRef } from "react";

// // // function TaskItem({ task, onDelete, onUpdate, darkMode }) {
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [editedText, setEditedText] = useState(task.title || "");
// // //   const inputRef = useRef(null);

// // //   // Save the updated task
// // //   const handleSave = () => {
// // //     const trimmed = editedText.trim();
// // //     if (!trimmed || trimmed === task.title) {
// // //       setIsEditing(false);
// // //       return;
// // //     }
// // //     onUpdate(task._id, trimmed);
// // //     setIsEditing(false);
// // //   };

// // //   // Cancel edit
// // //   const handleCancel = () => {
// // //     setIsEditing(false);
// // //     setEditedText(task.title);
// // //   };

// // //   // Click outside to save
// // //   useEffect(() => {
// // //     const handleClickOutside = (e) => {
// // //       if (
// // //         isEditing &&
// // //         inputRef.current &&
// // //         !inputRef.current.contains(e.target)
// // //       ) {
// // //         handleSave();
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, [isEditing, editedText]);

// // //   // Keyboard handlers
// // //   const handleKeyDown = (e) => {
// // //     if (e.key === "Enter") handleSave();
// // //     if (e.key === "Escape") handleCancel();
// // //   };

// // //   return (
// // //     <div
// // //       className={`flex items-center justify-between p-3 mb-2 rounded border ${
// // //         darkMode
// // //           ? "border-gray-700 bg-gray-800 text-white"
// // //           : "border-gray-300 bg-white"
// // //       }`}
// // //     >
// // //       {isEditing ? (
// // //         <input
// // //           ref={inputRef}
// // //           value={editedText}
// // //           onChange={(e) => setEditedText(e.target.value)}
// // //           onKeyDown={handleKeyDown}
// // //           className="flex-1 px-3 py-2 mr-2 rounded border focus:outline-none"
// // //         />
// // //       ) : (
// // //         <span className="flex-1">{task.title}</span>
// // //       )}

// // //       {isEditing ? (
// // //         <div className="flex gap-2">
// // //           <button
// // //             onClick={handleSave}
// // //             className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
// // //           >
// // //             Save
// // //           </button>
// // //           <button
// // //             onClick={handleCancel}
// // //             className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
// // //           >
// // //             Cancel
// // //           </button>
// // //         </div>
// // //       ) : (
// // //         <div className="flex gap-2">
// // //           <button
// // //             onClick={() => setIsEditing(true)}
// // //             className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
// // //           >
// // //             Edit
// // //           </button>
// // //           <button
// // //             onClick={() => onDelete(task._id)}
// // //             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
// // //           >
// // //             Delete
// // //           </button>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default TaskItem;

// // import React, { useState, useEffect, useRef } from "react";

// // function TaskItem({ task, onDelete, onUpdate, darkMode }) {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [editedText, setEditedText] = useState(task.title || "");
// //   const inputRef = useRef(null);

// //   // Handle save
// //   const handleSave = () => {
// //     const trimmed = editedText.trim();
// //     if (!trimmed || trimmed === task.title) {
// //       setIsEditing(false);
// //       return;
// //     }
// //     onUpdate(task._id, { title: trimmed });
// //     setIsEditing(false);
// //   };

// //   const handleCancel = () => {
// //     setIsEditing(false);
// //     setEditedText(task.title);
// //   };

// //   // Outside click to save
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (
// //         isEditing &&
// //         inputRef.current &&
// //         !inputRef.current.contains(e.target)
// //       ) {
// //         handleSave();
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, [isEditing, editedText]);

// //   // Keyboard save/cancel
// //   const handleKeyDown = (e) => {
// //     if (e.key === "Enter") handleSave();
// //     if (e.key === "Escape") handleCancel();
// //   };

// //   // Toggle completed state
// //   const toggleCompletion = () => {
// //     onUpdate(task._id, { completed: !task.completed });
// //   };

// //   return (
// //     <div
// //       className={`flex items-center justify-between p-3 mb-2 rounded border transition-all ${
// //         darkMode
// //           ? "border-gray-700 bg-gray-800 text-white"
// //           : "border-gray-300 bg-white text-gray-900"
// //       }`}
// //     >
// //       {/* Checkbox + Task */}
// //       <div className="flex items-center flex-1 gap-3">
// //         <input
// //           type="checkbox"
// //           checked={task.completed}
// //           onChange={toggleCompletion}
// //           className="w-4 h-4 accent-green-500"
// //         />

// //         {isEditing ? (
// //           <input
// //             ref={inputRef}
// //             value={editedText}
// //             onChange={(e) => setEditedText(e.target.value)}
// //             onKeyDown={handleKeyDown}
// //             className={`flex-1 px-2 py-1 border rounded ${
// //               darkMode ? "bg-gray-700 text-white" : "bg-white"
// //             }`}
// //             autoFocus
// //           />
// //         ) : (
// //           <div>
// //             <span
// //               className={`text-lg ${
// //                 task.completed ? "line-through opacity-60" : ""
// //               }`}
// //             >
// //               {task.title}
// //             </span>
// //             {task.dueTime && (
// //               <div
// //                 className={`text-sm mt-1 ${
// //                   darkMode ? "text-gray-300" : "text-gray-600"
// //                 }`}
// //               >
// //                 ⏰ {task.dueTime}
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       {/* Action buttons */}
// //       <div className="flex gap-2 ml-4">
// //         {isEditing ? (
// //           <>
// //             <button
// //               onClick={handleSave}
// //               className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
// //             >
// //               Save
// //             </button>
// //             <button
// //               onClick={handleCancel}
// //               className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
// //             >
// //               Cancel
// //             </button>
// //           </>
// //         ) : (
// //           <>
// //             <button
// //               onClick={() => setIsEditing(true)}
// //               className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
// //             >
// //               Edit
// //             </button>
// //             <button
// //               onClick={() => onDelete(task._id)}
// //               className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
// //             >
// //               Delete
// //             </button>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default TaskItem;

// import React, { useState, useEffect, useRef } from "react";

// function TaskItem({ task, onDelete, onUpdate, darkMode }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedText, setEditedText] = useState(task.title || "");
//   const inputRef = useRef(null);

//   // Save the updated task
//   const handleSave = () => {
//     const trimmed = editedText.trim();
//     if (!trimmed || trimmed === task.title) {
//       setIsEditing(false);
//       return;
//     }
//     onUpdate(task._id, trimmed);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditedText(task.title);
//   };

//   // Click outside to save
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         isEditing &&
//         inputRef.current &&
//         !inputRef.current.contains(e.target)
//       ) {
//         handleSave();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isEditing, editedText]);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") handleSave();
//     if (e.key === "Escape") handleCancel();
//   };

//   // ----- Notification logic -----
//   useEffect(() => {
//     if (!task.dueTime) return;

//     const notify = () => {
//       // Play a sound
//       const audio = new Audio("/notification.mp3"); // Add a notification sound in public folder
//       audio.play();

//       // Show browser notification
//       if (Notification.permission === "granted") {
//         new Notification("Task Reminder", {
//           body: task.title,
//         });
//       }
//     };

//     const now = new Date();
//     const due = new Date(task.dueTime);
//     const diff = due - now;

//     if (diff > 0) {
//       const timer = setTimeout(notify, diff);
//       return () => clearTimeout(timer);
//     } else if (diff <= 0) {
//       // If dueTime is in the past, optionally notify immediately
//       notify();
//     }
//   }, [task.dueTime, task.title]);

//   // Request notification permission on mount
//   useEffect(() => {
//     if (Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   return (
//     <div
//       className={`flex flex-col sm:flex-row items-center justify-between p-3 mb-2 rounded border ${
//         darkMode
//           ? "border-gray-700 bg-gray-800 text-white"
//           : "border-gray-300 bg-white"
//       }`}
//     >
//       <div className="flex-1">
//         {isEditing ? (
//           <input
//             ref={inputRef}
//             value={editedText}
//             onChange={(e) => setEditedText(e.target.value)}
//             onKeyDown={handleKeyDown}
//             className="flex-1 px-3 py-2 mr-2 rounded border focus:outline-none"
//           />
//         ) : (
//           <>
//             <span>{task.title}</span>
//             {task.dueTime && (
//               <div className="text-sm text-gray-400">
//                 ⏰ {new Date(task.dueTime).toLocaleString()}
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {isEditing ? (
//         <div className="flex gap-2 mt-2 sm:mt-0">
//           <button
//             onClick={handleSave}
//             className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//           >
//             Save
//           </button>
//           <button
//             onClick={handleCancel}
//             className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
//           >
//             Cancel
//           </button>
//         </div>
//       ) : (
//         <div className="flex gap-2 mt-2 sm:mt-0">
//           <button
//             onClick={() => setIsEditing(true)}
//             className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => onDelete(task._id)}
//             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TaskItem;

import React, { useState, useEffect, useRef } from "react";

function TaskItem({ task, onDelete, onUpdate, darkMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.title || "");
  const inputRef = useRef(null);

  // ---------------- Task editing ----------------
  const handleSave = () => {
    const trimmed = editedText.trim();
    if (!trimmed || trimmed === task.title) {
      setIsEditing(false);
      return;
    }
    onUpdate(task._id, { title: trimmed });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(task.title);
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  // ---------------- Task completion toggle ----------------
  const toggleCompletion = () => {
    onUpdate(task._id, { completed: !task.completed });
  };

  // ---------------- Notification logic ----------------
  useEffect(() => {
    if (!task.dueTime) return;

    const notify = () => {
      // Play sound
      const audio = new Audio("/sounds/soft-bells-495.ogg");
      audio.play();

      // Show browser notification
      if (Notification.permission === "granted") {
        new Notification("Task Reminder", {
          body: task.title,
        });
      }
    };

    const now = new Date();
    const due = new Date(task.dueTime);
    const diff = due - now;

    if (diff > 0) {
      const timer = setTimeout(notify, diff);
      return () => clearTimeout(timer);
    } else if (diff <= 0) {
      // If past due, notify immediately
      notify();
    }
  }, [task.dueTime, task.title]);

  // Request notification permission once
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between p-3 mb-2 rounded border transition-all ${
        darkMode
          ? "border-gray-700 bg-gray-800 text-white"
          : "border-gray-300 bg-white text-gray-900"
      }`}
    >
      {/* Checkbox + Task */}
      <div className="flex items-center flex-1 gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleCompletion}
          className="w-4 h-4 accent-green-500"
        />

        {isEditing ? (
          <input
            ref={inputRef}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`flex-1 px-2 py-1 border rounded ${
              darkMode ? "bg-gray-700 text-white" : "bg-white"
            }`}
            autoFocus
          />
        ) : (
          <div>
            <span
              className={`text-lg ${
                task.completed ? "line-through opacity-60" : ""
              }`}
            >
              {task.title}
            </span>
            {task.dueTime && (
              <div
                className={`text-sm mt-1 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                ⏰ {new Date(task.dueTime).toLocaleString()}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-2 sm:mt-0">
        {isEditing ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
