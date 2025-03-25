//Filename: controllers/subscriberController.js
import {
  getAllTasks,
  createTask,
  toggleTaskCompletion,
  deleteTask,
  updateTask
} from "../models/taskModel.js";

export const showTasks = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.render("index", {
      tasks,
      errors: req.session.errors,
      formData: req.session.formData
    });
    req.session.errors = null;
    req.session.formData = null;
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const addTask = async (req, res) => {
  const { title, description } = req.body;
  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  } else if (title.length < 3 || title.length > 100) {
    errors.push("Title must be between 3-100 characters");
  }

  if (description && description.length > 500) {
    errors.push("Description cannot exceed 500 characters");
  }

  if (errors.length > 0) {
    req.session.errors = errors;
    req.session.formData = { title, description };
    return res.redirect("/");
  }

  try {
    await createTask(title, description);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const toggleComplete = async (req, res) => {
  try {
    await toggleTaskCompletion(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const removeTask = async (req, res) => {
  try {
    await deleteTask(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const editTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  } else if (title.length < 3 || title.length > 100) {
    errors.push("Title must be between 3-100 characters");
  }

  if (description && description.length > 500) {
    errors.push("Description cannot exceed 500 characters");
  }

  if (errors.length > 0) {
    req.session.errors = errors;
    return res.redirect("/");
  }

  try {
    await updateTask(id, title, description);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Server Error");
  }
};