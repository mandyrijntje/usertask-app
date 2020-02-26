const { Router } = require("express");
const Task = require("./model");
const User = require("../User/model");

const router = new Router();

// Get all user's tasks
router.get("/users/:userId/tasks", (req, res, next) => {
  Task.findAll({ where: { userId: req.params.userId } })
    .then(tasks => {
      res.json(tasks);
    })
    .catch(next);
});

// Get a single user task
router.get("/users/:userId/tasks/:taskId", (req, res, next) => {
  Task.findOne({
    where: {
      id: req.params.taskId,
      userId: req.params.userId
    }
  })
    .then(task => {
      if (task) {
        res.json(task);
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

// Create a new task
router.post("/users/:userId/tasks", async (req, res, next) => {
  User.findByPk(req.params.userId)
    .then(user => {
      if (!user) {
        res.status(404).end();
      } else {
        Task.create({
          ...req.body,
          userId: req.params.userId
        }).then(task => {
          res.json(task);
        });
      }
    })
    .catch(next);
});

// Update an existing task
router.put("/users/:userId/tasks/:taskId", (req, res, next) => {
  Task.findOne({
    where: {
      id: req.params.taskId,
      userId: req.params.userId
    }
  })
    .then(task => {
      if (task) {
        task.update(req.body).then(task => res.json(task));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

// Delete a user's task
router.delete("/users/:userId/tasks/:taskId", (req, res, next) => {
  Task.destroy({
    where: {
      id: req.params.taskId,
      userId: req.params.userId
    }
  })
    .then(numDeleted => {
      if (numDeleted) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

// Delete all user's tasks
router.delete("/users/:userId/tasks", async (req, res, next) => {
  Task.destroy({
    where: {
      userId: req.params.userId
    }
  })
    .then(() => {
      res.status(204).end();
    })
    .catch(next);
});

module.exports = router;
