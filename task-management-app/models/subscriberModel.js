//Filename: models/subscriberModel.js

import { query } from "../config/db.js";

export const getAllTasks = async (filter = null, sort = null) => {
  try {
    let sql = "SELECT * FROM tasks";
    const params = [];
    
    // Add filtering if specified
    if (filter === 'completed') {
      sql += " WHERE completed = true";
    } else if (filter === 'active') {
      sql += " WHERE completed = false";
    }

    // Add sorting if specified
    if (sort === 'priority') {
      sql += " ORDER BY CASE priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 WHEN 'low' THEN 3 ELSE 4 END";
    } else {
      sql += " ORDER BY created_at DESC";
    }

    const result = await query(sql, params);
    return result.rows;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTask = async (title, description, priority) => {
  try {
    const result = await query(
      "INSERT INTO tasks (title, description, priority) VALUES ($1, $2, $3) RETURNING *",
      [title, description, priority || 'medium']
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const toggleTaskCompletion = async (id) => {
  try {
    const result = await query(
      "UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error toggling task completion:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    await query("DELETE FROM tasks WHERE id = $1", [id]);
    return { id };
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};