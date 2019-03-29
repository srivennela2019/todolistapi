$(document).ready(function() {
  $.getJSON("http://localhost:3000/api/todos").then(addTodos);
  $("#todoInput").keypress(function(event) {
    if (event.which == 13) {
      createTodo();
    }
  });
});
function addTodos(todos) {
  todos.forEach(function(todo) {
    addTodo(todo);
  });
}
function addTodo(todo) {
  var newtodo = $("<li class='task'>" + todo.name + "<span>x</span></li>");
  newtodo.data("id", todo._id);
  newtodo.data("completed", todo.completed);
  if (todo.completed) {
    newtodo.addClass("done");
  }
  $(".list").append(newtodo);
}
function createTodo() {
  var todoinput = $("#todoInput").val();
  $.post("http://localhost:3000/api/todos", {
    name: todoinput
  }).then(function(newtodo) {
    $("#todoInput").val("");
    addTodo(newtodo);
  });
}
$(".list").on("click", "span", function(e) {
  //e.stopPropagation();
  var clickedid = $(this)
    .parent()
    .data("id");
  var Url = "http://localhost:3000/api/todos/" + clickedid;
  $.ajax({
    method: "DELETE",
    url: Url
  }).then(function(data) {
    $(this)
      .parent()
      .remove();
  });
});
$(".list").on("click", "li", function() {
  updateTodo($(this));
});
function updateTodo(todo) {
  var UUrl = "http://localhost:3000/api/todos/" + todo.data("id");
  var isDone = !todo.data("completed");
  var updateData = { completed: isDone };
  $.ajax({
    method: "PUT",
    url: UUrl,
    data: updateData
  }).then(function(data) {
    todo.toggleClass("done");
    todo.data("completed", isDone);
  });
}
