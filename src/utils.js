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
  resPromise.then((res)=> {
    const jsonResponse = res.json();
    jsonResponse.then((json)=> {
      // console.log(json);
      jsonList = json;
      todoList = jsonList["my-todo"];
      // console.log(todoList);
      counter.innerText = todoList.length;
      localStorage.setItem("my-todo", JSON.stringify(todoList));
      arrayToDiv(todoList);
      spinner.hidden = true;
    }).catch((err) =>{
      console.log(jsonList.message);
    })
  })
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
      console.log("Success:", jsonList);
      spinner.hidden = true;
    })
    .catch((error) => {
      console.error("Error:", error);
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
  }).then(()=>{
    spinner.hidden = true;
  });
}

// //When the page is loaded its content is taken from jsonbin.io and updates the localStorage
// document.addEventListener("DOMContentLoaded", async (e) => {
//   let response = await fetch(
//     "https://api.jsonbin.io/v3/b/6013b6761de5467ca6bdb0ce/latest"
//   );
//   let jsonResponse = await response.json();
//   let objectResponse = jsonResponse["record"];
//   jsonList = objectResponse;
//   todoList = jsonList["my-todo"];
//   counter.innerText = todoList.length;
//   localStorage.setItem("my-todo", JSON.stringify(todoList));
//   arrayToDiv(todoList);
// });