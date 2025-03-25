//Filename: routes/taskmanagementRoutes.js
import express from "express";
const router = express.Router();

import {
  showTasks,
  addTask,
  toggleComplete,
  removeTask,
  editTask
} from "../controllers/taskController.js";


// GET / - Display main page with tasks and form
router.get("/", showTasks);

// POST /tasks - Add new task
router.post("/tasks", addTask);

// PATCH /tasks/:id - Toggle completion status
router.patch("/tasks/:id", toggleComplete);

// DELETE /tasks/:id - Delete task
router.delete("/tasks/:id", removeTask);

// PUT /tasks/:id - Update task details
router.put("/tasks/:id", editTask);

export default router;