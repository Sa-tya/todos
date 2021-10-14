const mongoose = require("mongoose");

// const todoSchema = new mongoose.Schema({
//   // todos: [{
//     task: { type: String },
//     discription: { type: String },
//     cdate: { type: Date },
//     // ddate: { type: Date },
//     udate: { type: Date, default: null }
//   // }]
// });

const userSchema = new mongoose.Schema({
  username: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  todos: [{ type:'ObjectId', ref:'todo'}]
});

// module.exports = mongoose.model("todo", todoSchema);
module.exports = mongoose.model("user", userSchema);