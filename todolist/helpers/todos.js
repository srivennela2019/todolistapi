var db = require("../models");
exports.getTodos = function(req, res) {
  // res.send('hello from todos routes');
  db.Todo.find().then(function(todos) {
    res.json(todos);
  });
};
exports.createTodos=function(req, res) {
    db.Todo.create(req.body).then(function(newTodo) {
      res.status(201).json(newTodo);
    });
    // res.send(req.body);
    // res.send("hello from todos post routes");
  };
  exports.getTodo=function(req, res) {
    // res.send('hello from todos routes');
    db.Todo.findById(req.params.todoId).then(function(foundtodo) {
      res.json(foundtodo);
    });
  };
  exports.updateTodo=function(req, res) {
    //res.send("update route");
    db.Todo
      .findOneAndUpdate({ _id: req.params.todoId }, req.body)
      .then(function(todo) {
        res.json(todo);
      });
  };
  exports.deleteTodo=function(req, res) {
    //res.send("update route");
    db.Todo.remove({ _id: req.params.todoId }).then(function() {
      res.json({ message: "deleted" });
    });
  };
module.exports = exports;
