//Filename: models/subscriberModel.js

import { query } from "../config/db.js";

// Get all tasks with optional search functionality
export const getAllTasks = async (searchQuery = '') => {
  try {
      let sql = "SELECT * FROM tasks";
      let params = [];

     // If search query exists, add WHERE clause to search in title/description
      if (searchQuery && searchQuery.trim() !== '') {
        sql += " WHERE LOWER(title) LIKE $1 OR LOWER(description) LIKE $1";
        params.push(`%${searchQuery.toLowerCase().trim()}%`);
      }

      // Always order by creation date (newest first)
      sql += " ORDER BY created_at DESC";
      const result = await query(sql, params);
      return result.rows;
      } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
  }
};

// Create a new task
export const createTask = async (title, description) => {
  try {
    const result = await query(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    return result.rows[0]; // Return the newly created task
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Toggle task completion status
export const toggleTaskCompletion = async (id) => {
  try {
    const result = await query(
       // NOT completed flips the boolean value
      "UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0]; // Return the updated task
  } catch (error) {
    console.error("Error toggling task:", error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    await query("DELETE FROM tasks WHERE id = $1", [id]);
    return { id }; //Return the deleted task ID
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

//Update tasks details
export const updateTask = async (id, title, description) => {
  try {
    const result = await query(
      "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );
    return result.rows[0]; //Return the updated task
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};