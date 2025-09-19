import express from "express";
import Task from "../models/Task.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get tasks for logged-in user
router.get("/", authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Add task
router.post("/", authenticate, async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Task title required" });

  try {
    const newTask = await Task.create({ title, user: req.userId });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to add task" });
  }
});

// Update task
router.put("/:id", authenticate, async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title: req.body.title },
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete task
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!deletedTask) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
