const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  // todos: [{
    task: { type: String },
    discription: { type: String },
    cdate: { type: Date },
    // ddate: { type: Date },
    udate: { type: Date, default: null }
  // }]
});

module.exports = mongoose.model("todo", todoSchema);