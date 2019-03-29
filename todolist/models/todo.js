var mongoose = require("mongoose");
var todoschema = mongoose.Schema({
  name: {
    type: String,
    required: [true,"name required"]
  },
  completed: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

var Todo = mongoose.model("Todo", todoschema);
module.exports = Todo;
