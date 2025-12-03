const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/authMiddleware');

// Get all tasks for logged-in user
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// Add new task
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ userId: req.userId, title, description });
  await task.save();
  res.json(task);
});

// Update task
router.put('/:id', auth, async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { title, description },
    { new: true }
  );
  res.json(task);
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: 'Task deleted' });
});

module.exports = router;
