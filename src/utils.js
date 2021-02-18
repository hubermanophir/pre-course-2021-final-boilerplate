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
  const resPromise = fetch("http://localhost:3000/b/6013b6761de5467ca6bdb0ce");
  resPromise.then((res) => {
    const jsonResponse = res.json();
    jsonResponse
      .then((json) => {
        jsonList = json;
        todoList = jsonList["my-todo"];
        counter.innerText = todoList.length;
        localStorage.setItem("my-todo", JSON.stringify(todoList));
        arrayToDiv(todoList);
        spinner.hidden = true;
      })
      ;
  }).catch((err) => {
    console.log(jsonList.message);
    spinner.hidden = true;
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
    .then((response) => response.json())
    .then((jsonList) => {
      // console.log(response)
      if (jsonList.message === "Bin not found") {
        console.log("error")
        spinner.hidden = true;
      } else {
        console.log("Success:", jsonList);
        spinner.hidden = true;
      }
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
      const promise = res.json();
      promise.then((res) => {
        console.log(res.message);
        spinner.hidden = true;
      })
    });
}
