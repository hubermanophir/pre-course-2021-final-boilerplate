const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;
const fs = require("fs");

//create file with the corresponding id as name
app.post("/b", (req, res) => {
  const { body } = req;
  const { id } = body;
  fs.writeFileSync(`./database/${id}.json`, JSON.stringify(body, null, 4));
  res.send(req.body);
});

//get file with using the id
app.get("/b/:id", (req, res) => {
  try {
    res.send(fs.readFileSync(`./database/${req.params.id}.json`));
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT);
console.log(`listening on port: ${PORT}`);
