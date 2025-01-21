// Create web server
// Run the server
// Create a route to get all comments
// Create a route to get one comment
// Create a route to create a comment
// Create a route to update a comment
// Create a route to delete a comment

const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.json());

const comments = [
  { id: 1, message: "Comment 1" },
  { id: 2, message: "Comment 2" },
  { id: 3, message: "Comment 3" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/comments", (req, res) => {
  res.send(comments);
});

app.get("/api/comments/:id", (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send("The comment with the given ID was not found");
  res.send(comment);
});

app.post("/api/comments", (req, res) => {
  const schema = Joi.object({
    message: Joi.string().min(3).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const comment = {
    id: comments.length + 1,
    message: req.body.message
  };
  comments.push(comment);
  res.send(comment);
});