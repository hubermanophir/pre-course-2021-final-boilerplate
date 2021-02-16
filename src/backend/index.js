const express = require('express');
const app = express();
app.use(express.json());

//gets all the tasks
app.get('/tasks', (req, res) => {
	res.send(tasks);
});

//gets a specific task
app.get('/tasks/:id', (req, res) => {
	const id = req.params.id;

	for (const task of tasks) {
		if (task.id === id) {
			res.send(task);
		}
	}
});

//pushes a json 
app.post('/tasks', (req, res) => {
    tasks.push(req.body);
    res.send(req.body);
});


//updates an object
app.put('/tasks', (req, res) => {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === req.body.id) {
            tasks[i] = req.body;
            res.send(req.body);
        } 
    }
});

app.delete('/tasks', (req, res) => {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === req.body.id) {
            tasks.splice(i,1);
            res.send('removed');
        } 
    }
});
