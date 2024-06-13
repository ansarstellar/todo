import express from "express";
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true })); // for parsing

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// In-memory task storage (for simplicity)
let tasks = [];

// Routes
app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task);
    }
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const taskIndex = req.body.taskIndex;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks.splice(taskIndex, 1);
    }
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
