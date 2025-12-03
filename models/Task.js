const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  userId: { type: String, required: true },   // kaun user ka task hai
  title: { type: String, required: true },    // task ka title
  description: { type: String }               // task ka description (optional)
});

module.exports = mongoose.model('Task', TaskSchema);
