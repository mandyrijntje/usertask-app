// // Creating a User

// // X start a docker container with postgres
// // X import sequelize
// // X create a sequelize instance (with the connection string to our database)
// // X define a model
// // X sync our app to the database
// // X app.use the body parser middleware (so we can read request bodies)
// // X app.post route
// // X Create the user and save it to the database
// // X send a response

// // DELETING A USER

// // X app.delete -> we define a route (url)
// // X we need a parameter in this route (what user do we want to delete)
// // X use a Sequelize method to actually delete the user
// // X send a response

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const userRoutes = require("./User/router");
const taskRoutes = require("./Task/router");

const app = express();
const port = process.env.PORT || 4000;

db.sync()
  .then(() => console.log("Tables created successfully"))
  .catch(err => {
    console.error("Unable to create tables, shutting down...", err);
    process.exit(1);
  });

app.use(bodyParser.json());
app.use(userRoutes);
app.use(taskRoutes);

// Just using this endpoint for testing :)
app.post("/echo", (req, res) => {
  res.json(req.body);
});

app.listen(port, () => console.log("listening on port " + port));
