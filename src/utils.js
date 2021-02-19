// const { response } = require("express");

const API_KEY = "$2b$10$5P7RliLTaANiyqYHfkRvWepKYlCjfoARhVbWxxlqCTwQexhfzjuES"; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";

// Gets data from persistent storage by the given key and returns it
async function getPersistent(key) {
  return [];
}

// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
async function setPersistent(key, data) {
  return true;
}

//When the page is loaded its content is taken from jsonbin.io and updates the localStorage
document.addEventListener("DOMContentLoaded", (e) => {
  spinner.hidden = false;
  fetch("http://localhost:3000/b/6013b6761de5467ca6bdb0ce")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Failed to fetch local host error:"+ res.status);
      }
    })
    .then((json) => {
      jsonList = json;
      todoList = jsonList["my-todo"];
      counter.innerText = todoList.length;
      localStorage.setItem("my-todo", JSON.stringify(todoList));
      arrayToDiv(todoList);
      spinner.hidden = true;
    })
    .catch((err) => {
      spinner.hidden = true;
      loadError.hidden =false;
      console.error(err);
    });
});

//Updates the list and sends a success/error in console log
function updateList() {
  spinner.hidden = false;
  fetch("http://localhost:3000/b/6013b6761de5467ca6bdb0ce", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key":
        "$2b$10$5P7RliLTaANiyqYHfkRvWepKYlCjfoARhVbWxxlqCTwQexhfzjuES",
    },
    body: JSON.stringify(jsonList),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Failed to update list:"+ res.status);
      }
    })
    .then((jsonList) => {
      console.log("Success:", jsonList);
      spinner.hidden = true;
    })
    .catch((error) => {
      updateError.hidden = false;
      console.error(error);
      spinner.hidden = true;
    });
}

//Empties the Jsonbin.io json
function emptyJsonbin() {
  spinner.hidden = false;

  fetch("http://localhost:3000/b/6013b6761de5467ca6bdb0ce", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key":
        "$2b$10$5P7RliLTaANiyqYHfkRvWepKYlCjfoARhVbWxxlqCTwQexhfzjuES",
    },
    body: JSON.stringify({ "my-todo": [] }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Failed to empty list error:" + res.status);
      }
    })
    .then((res) => {
      spinner.hidden = true;
      console.log("items deleted");
    })
    .catch((err) => {
      deleteError.hidden = false;
      spinner.hidden = true;
      console.error(err);
    });
}
