//Filename: controllers/subscriberController.js
import {
  getAllTasks,
  createTask,
  toggleTaskCompletion,
  deleteTask,
  updateTask
} from "../models/taskModel.js";

// Enhanced validation with detailed messages
const validateTaskInput = (title, description) => {
  const errors = [];
  
  // Title validation
  title = title?.trim() || '';
  if (!title) {
    errors.push("Title is required");
  } else {
    if (title.length < 3) {
      errors.push("Title must be at least 3 characters");
    }
    if (title.length > 100) {
      errors.push("Title cannot exceed 100 characters");
    }
  }

  // Description validation
  if (description && description.length > 500) {
    errors.push("Description cannot exceed 500 characters");
  }

  return errors;
};

// Helper to build error redirect URL
const buildErrorUrl = (errors, formData = {}) => {
  const params = new URLSearchParams();
  if (errors.length > 0) {
    params.append('errors', JSON.stringify(errors));
  }
  if (formData.title) {
    params.append('title', formData.title);
  }
  if (formData.description) {
    params.append('description', formData.description);
  }
  return `/?${params.toString()}`;
};

export const showTasks = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    
    // Get errors and form data from query params
    const errors = req.query.errors ? JSON.parse(req.query.errors) : [];
    const formData = {
      title: req.query.title || '',
      description: req.query.description || ''
    };
    
    res.render("task", {
      tasks: tasks || [],
      errors,
      formData,
      titleLength: formData.title.length,
      descLength: formData.description.length
    });
  } catch (error) {
    console.error('Error:', error);
    res.redirect(buildErrorUrl(["Failed to load tasks"]));
  }
};

export const addTask = async (req, res) => {
  const { title, description } = req.body;
  const errors = validateTaskInput(title, description);

  if (errors.length > 0) {
    return res.redirect(buildErrorUrl(errors, { title, description }));
  }

  try {
    await createTask(title.trim(), description?.trim());
    res.redirect("/");
  } catch (error) {
    console.error('Error:', error);
    res.redirect(buildErrorUrl(["Failed to create task"], { title, description }));
  }
};

export const toggleComplete = async (req, res) => {
  try {
    await toggleTaskCompletion(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.error('Error:', error);
    res.redirect(buildErrorUrl(["Failed to toggle task status"]));
  }
};

export const removeTask = async (req, res) => {
  try {
    await deleteTask(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.error('Error:', error);
    res.redirect(buildErrorUrl(["Failed to delete task"]));
  }
};

export const editTask = async (req, res) => {
  const { title, description } = req.body;
  const errors = validateTaskInput(title, description);

  if (errors.length > 0) {
    return res.redirect(buildErrorUrl(errors, { title, description }));
  }

  try {
    await updateTask(req.params.id, title.trim(), description?.trim());
    res.redirect("/");
  } catch (error) {
    console.error('Error:', error);
    res.redirect(buildErrorUrl(["Failed to update task"], { title, description }));
  }
};