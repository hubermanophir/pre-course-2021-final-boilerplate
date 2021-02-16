const express = require('express');
const app = express();
app.use(express.json());

//gets all the tasks
app.get('/b', (req, res) => {
	res.send(todoItems);
});

//gets a specific task
app.get('/b/:id', (req, res) => {
	const id = req.params.id;
	for (const item of items) {
		if (item.id === id) {
			res.send(item);
		}
	}
});

//pushes a json 
app.post('/b', (req, res) => {
    todoItems.push(req.body);
    res.send(req.body);
});


//updates an object
app.put('/b/:id', (req, res) => {
    const id = req.params.id;
    for (let i = 0; i < todoItems.length; i++) {
        if (todoItems[i].id === id) {
            todoItems[i] = req.body;
            res.send(req.body);
        } 
    }
});

app.delete('/b/:id', (req, res) => {
    const id = req.params.id;
    for (let i = 0; i < todoItems.length; i++) {
        if (todoItems[i].id === id) {
            todoItems.splice(i,1);
            res.send('removed');
        } 
    }
});

app.listen(3000);