const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
  user: 'ukd_admin',
  host: 'ep-square-mouse-262994.us-west-2.aws.neon.tech',
  database: 'ukd',
  password: 'YyfeQqL0W8uS',
  port: 5432,
});
// task 1
app.post('/students', async (req, res) => {
    try {
      const { name, email } = req.body;
      const result = await pool.query('INSERT INTO students(name, email) VALUES($1, $2) RETURNING *', [name, email]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
//   task 2
app.post('/tasks', async (req, res) => {
    try {
      const { student_id, subject, description } = req.body;
      const result = await pool.query('INSERT INTO tasks(student_id, subject, description) VALUES($1, $2, $3) RETURNING *', [student_id, subject, description]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
//  task 3
app.get('/students', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM students');
      const students = result.rows;
      for (const student of students) {
        const tasksResult = await pool.query('SELECT * FROM tasks WHERE student_id = $1', [student.id]);
        student.tasks = tasksResult.rows;
      }
      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  