//Filename: controllers/subscriberController.js

import { 
    getAllTasks, 
    addTask, 
    toggleTaskCompletion, 
    deleteTask 
  } from "../models/subscriberModel.js";
  
  export const showTasks = async (req, res) => {
    try {
      const { filter, sort } = req.query;
      const tasks = await getAllTasks(filter, sort);
      
      res.render("index", {
        title: "Task Manager",
        tasks,
        filter,
        sort,
        formData: req.session.formData || null,
        errors: req.session.errors || null
      });
      
      // Clear session data after rendering
      req.session.formData = null;
      req.session.errors = null;
      
    } catch (error) {
      res.status(500).render("error", {
        title: "Server Error",
        message: "Failed to load tasks. Please try again later."
      });
    }
  };
  
  export const createTask = async (req, res) => {
    const { title, description, priority } = req.body;
    const errors = [];
  
    // Validation
    if (!title || title.trim().length === 0) {
      errors.push("Title is required");
    } else if (title.length < 3 || title.length > 100) {
      errors.push("Title must be between 3 and 100 characters");
    }
  
    if (description && description.length > 500) {
      errors.push("Description cannot exceed 500 characters");
    }
  
    if (errors.length > 0) {
      req.session.errors = errors;
      req.session.formData = { title, description, priority };
      return res.redirect("/");
    }
  
    try {
      await addTask(title, description, priority);
      res.redirect("/");
    } catch (error) {
      if (error.code === "23505") {
        req.session.errors = ["This task already exists"];
        req.session.formData = { title, description, priority };
        return res.redirect("/");
      }
      res.status(500).render("error", {
        title: "Server Error",
        message: "Failed to create task. Please try again later."
      });
    }
  };
  
  export const toggleTask = async (req, res) => {
    try {
      await toggleTaskCompletion(req.params.id);
      res.redirect("/");
    } catch (error) {
      res.status(500).render("error", {
        title: "Server Error",
        message: "Failed to update task status. Please try again later."
      });
    }
  };
  
  export const removeTask = async (req, res) => {
    try {
      await deleteTask(req.params.id);
      res.redirect("/");
    } catch (error) {
      res.status(500).render("error", {
        title: "Server Error",
        message: "Failed to delete task. Please try again later."
      });
    }
  };