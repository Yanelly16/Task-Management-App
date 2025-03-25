//Filename: routes/taskmanagementRoutes.js
import express from "express";
const router = express.Router();
import {
    getAllTasks,
    createTask,
    toggleTaskComplete,
    deleteTask,     
  } from "../controllers/subscriberController.js";
  
router.get('/', getAllTasks);
router.post('/tasks',createTask);
router.patch('/tasks/:id', toggleTaskComplete);
router.delete('/tasks/:id', deleteTask);

export default router;