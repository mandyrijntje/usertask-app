const User = require("./model");
const { Router } = require("express");

const router = new Router();

// Create a new user account
router.post("/users", (req, res, next) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next);
});

// Get a user's information
router.get("/users/:userId", (req, res, next) => {
  User.findByPk(req.params.userId)
    .then(user => {
      if (!user) {
        res.status(404).end();
      } else {
        res.json(user);
      }
    })
    .catch(next);
});

// Update a user's information
router.put("/users/:userId", (req, res, next) => {
  User.findByPk(req.params.userId)
    .then(user => {
      if (user) {
        user.update(req.body).then(user => res.json(user));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

module.exports = router;
