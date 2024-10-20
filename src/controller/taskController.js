const Task = require('../model/task');

// Get all tasks (with filters)
exports.getTasks = async (req, res) => {
    try {
        const { completed, priority } = req.query;
        const filter = { user: req.user.id };
        if (completed) filter.completed = completed === 'true';
        if (priority) filter.priority = priority;

        const tasks = await Task.find(filter);
        res.json(tasks);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Create a task
exports.createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const task = await newTask.save();
        res.json(task);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(task);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Task removed' });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};