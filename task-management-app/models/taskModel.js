//Filename: models/subscriberModel.js

import { query } from "../config/db.js";

export const getAllTasks = async () => {
  try {
    const result = await query("SELECT * FROM tasks ORDER BY created_at DESC");
    return result.rows;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

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