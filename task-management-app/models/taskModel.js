//Filename: models/subscriberModel.js

import { query } from "../config/db.js";
export const getAllTasks = async (searchQuery = '') => {
  try {
      let sql = "SELECT * FROM tasks";
      let params = [];
      
      if (searchQuery && searchQuery.trim() !== '') {
          sql += " WHERE LOWER(title) LIKE $1 OR LOWER(description) LIKE $1";
          params.push(`%${searchQuery.toLowerCase().trim()}%`);
      }
      
      sql += " ORDER BY created_at DESC";
      const result = await query(sql, params);
      return result.rows;
  } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
  }
};
/*export const getAllTasks = async () => {
  try {
    const result = await query("SELECT * FROM tasks ORDER BY created_at DESC");
    return result.rows;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};*/

export const createTask = async (title, description) => {
  try {
    const result = await query(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating task:", error);
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
    console.error("Error toggling task:", error);
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

export const updateTask = async (id, title, description) => {
  try {
    const result = await query(
      "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};