const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const Todo = require('../model/todo');
// const { findOneAndUpdate } = require('../model/user');
const User = require('../model/user');

router.get('/', (req, res) => {
    // const t = await User.find({_id : req.user.user_id}).exec();
    // console.log(t);
    User.find({_id : req.user.user_id}).populate('todos').exec((err, doc) => {
        if (err) res.status(404).send(err);
        // console.log(doc[0].todos);
        res.status(200).json(doc[0].todos);
    });
    // res.send('todos get...')
});

router.get('/:id', async (req, res) => {
    let t = await Todo.findOne({ _id: req.params.id }).exec();
    res.status(200).send(t);
    // res.render('edit', { task: '', discription: '', duedate: '' });
});

router.post('/', (req, res) => {
    try {
        const { task, discription } = req.query;

        if (task && discription && typeof task === 'string' && typeof discription === 'string') {
            let todo = new Todo();
            todo.task = task;
            todo.discription = discription;
            todo.cdate = Date.now();
            todo.save();
            User.findOneAndUpdate({ _id: req.user.user_id },
                { $push: { todos: todo._id } },
                { new: true }, (err, doc) => {
                    if (err) res.status(404).send(err);
                    res.status(200).send(doc);
                });
            // res.status(200).send('Task added');
        }
        else
            res.status(200).send('Enter valid input');
    }
    catch (err) {
        res.send(err);
    }

});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    // console.log(req.query.userId);
    User.findByIdAndUpdate(req.user.user_id,
        { $pull: { todos: id } },
        { new: true },
        (err, doc) => {
            if (err) res.send(err);
            // res.status(200).send(doc)

        });
    // User.updateOne({ _id: req.query.userId }, { $pop: { todos: { _id: id } } })
    Todo.findOneAndDelete({ _id: id },
        (err, doc) => {
            if (err) res.status(404).send(err);
            res.send(' task deleted...');
        });
    // res.send(' task deleted...');
});

router.put('/:id', (req, res) => {
    try {
        const { task, discription } = req.query;

        if (task && discription && typeof task === 'string' && typeof discription === 'string') {
            Todo.findOneAndUpdate({ _id: req.params.id },
                { $set: { task: task, discription: discription, udate: Date.now() } },
                { new: true }, (err, doc) => {
                    if (err) res.status(404).send(err);
                    // res.status(200).send(doc);
                    res.status(200).send('Task updated..');
                });
            // todo.task = task;
            // todo.discription = discription;
            // todo.udate = Date.now();
            // todo.save();
            // res.status(200).send('Task updated..');
        }
        else
            res.status(200).send('Enter valid input');
    }
    catch (err) {
        res.send(err);
    }
});

module.exports = router;