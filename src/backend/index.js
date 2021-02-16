const express = require("express");
const app = express();
app.use(express.json());
const todoItems = require("./todoItems.json");

//gets all the tasks
app.get("/b", (req, res) => {
  res.send(todoItems);
});

//gets a specific task
app.get("/b/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.send(todoItems.filter((item) => item.id === id));
});

//pushes a json
app.post("/b", (req, res) => {
  todoItems.push(req.body);
  res.send(req.body);
});

//updates an object
app.put("/b/:id", (req, res) => {
  const id = parseInt(req.params.id);
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === id) {
      todoItems[i] = req.body;
      res.send(req.body);
    }
  }
});

app.delete("/b/:id", (req, res) => {
  const id = parseInt(req.params.id);
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === id) {
      todoItems.splice(i, 1);
      res.send("removed");
    }
  }
});

app.listen(3000);
