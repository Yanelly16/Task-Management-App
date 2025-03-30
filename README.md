
# Task-Management-Test#1
## Overview
This is a Task Management Web Application built with Node.js, Express, PostgreSQL, and EJS for server-side rendering. Users can create, view, update, and delete tasks with proper data validation and persistent storage in a PostgreSQL database.

## Features
✅ View a list of tasks  
✅ Add new tasks with a title and optional description  
✅ Toggle task completion status 
✅ Delete tasks  
✅ Input validation(title length, description length)
✅ Persistent data storage in PostgreSQL

## Setup Instructions
***Database setup***
 1. Cd into the Directory

    cd task-management-app

2. Start PostgreSQl service
   
   sudo servive postgresql restart

3. Sign in into the database
   
   psql --host=localhost --dbname=tasks --username=tasks

4. Enter password for ***Tasks Database***
   
   tasks=> ***tasks***

5. Create a Query to extract information
   
   SELECT * FROM tasks; ***Extract all the 'tasks' table field and data.***

***App setup***

1. Open a new terminal  and Cd into the Directory

    cd task-management-app

2. Run the application
   
   npm start

The app will be available at : http://localhost:3000

## Usage Guide
Here's a clean, user-focused **Usage Guide** for your web application:

---

## 🌟 How to Use the Task Manager

### ✨ Getting Started
1. Open the app in your browser at: `http://localhost:3000`
2. You'll see:
   - Your current task list (empty at first)
   - An "Add Task" form at the top

### 📥 Adding Tasks
1. In the form:
   - **Title** (required): Type your task name (3-100 characters)
   - **Description** (optional): Add details if needed
2. Click the blue **"Add Task"** button
3. Your new task will appear in the list below

### ✅ Marking Tasks Complete
- Click the **Complete** next to delete button to mark it complete.
- Completed tasks will appear with a strikethrough: ~~Like this~~

### 🔄 Undoing Completion
- Click the **undo button** ✔️ to mark a task incomplete again

### 🗑️ Deleting Tasks
- Click **"Delete"** button to remove it permanently
- ❗ No confirmation dialog - deleted tasks are gone immediately!

### 🔍 Viewing Your Tasks
- The list shows all tasks added
- Each task shows:
  - Title (bold)
  - Description (if provided)
  - Creation date/time

### 💡 Tips
- Refresh the page anytime - your tasks are saved in the database
- Try adding a task with just 2 characters to see the error message
- Hover over completed tasks to see when they were finished


## Demo Video
 
   
