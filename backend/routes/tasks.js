// import express from "express";
// import Task from "../models/Task.js";

// const router = express.Router();

// // Get all tasks
// router.get("/", async (req, res) => {
//   try {
//     const tasks = await Task.find().sort({ createdAt: -1 });
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Add new task
// router.post("/", async (req, res) => {
//   try {
//     const newTask = new Task(req.body);
//     const savedTask = await newTask.save();
//     res.json(savedTask);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Update task
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(updatedTask);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Delete task
// router.delete("/:id", async (req, res) => {
//   try {
//     await Task.findByIdAndDelete(req.params.id);
//     res.json({ message: "Task deleted" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// export default router;

// import express from "express";
// import Task from "../models/Task.js";
// import { authenticate } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Protect all task routes
// router.use(authenticate);

// // Get tasks for logged-in user
// router.get("/", async (req, res) => {
//   const tasks = await Task.find({ userId: req.userId });
//   res.json(tasks);
// });

// // Create task for user
// router.post("/", async (req, res) => {
//   const { title, description } = req.body;
//   const newTask = await Task.create({
//     title,
//     description,
//     completed: false,
//     userId: req.userId,
//   });
//   res.status(201).json(newTask);
// });

// // Update task (only user's)
// router.put("/:id", async (req, res) => {
//   const task = await Task.findOneAndUpdate(
//     { _id: req.params.id, userId: req.userId },
//     req.body,
//     { new: true }
//   );
//   if (!task) return res.status(404).json({ error: "Task not found" });
//   res.json(task);
// });

// // Delete task (only user's)
// router.delete("/:id", async (req, res) => {
//   const task = await Task.findOneAndDelete({
//     _id: req.params.id,
//     userId: req.userId,
//   });
//   if (!task) return res.status(404).json({ error: "Task not found" });
//   res.json({ message: "Task deleted" });
// });

// export default router;

import express from "express";
import Task from "../models/Task.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Get all tasks for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(tasks);
});

// Add task
router.post("/", authMiddleware, async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Task title required" });

  const newTask = await Task.create({ title, user: req.userId });
  res.status(201).json(newTask);
});

// Update task
router.put("/:id", authMiddleware, async (req, res) => {
  const updatedTask = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { title: req.body.title },
    { new: true }
  );
  if (!updatedTask) return res.status(404).json({ error: "Task not found" });
  res.json(updatedTask);
});

// Delete task
router.delete("/:id", authMiddleware, async (req, res) => {
  const deletedTask = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });
  if (!deletedTask) return res.status(404).json({ error: "Task not found" });
  res.json({ message: "Task deleted" });
});

export default router;
