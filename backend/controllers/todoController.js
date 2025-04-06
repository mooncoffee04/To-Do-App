const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  const todos = await Todo.findAll({ where: { UserId: req.user.id } });
  res.json(todos);
};

exports.addTodo = async (req, res) => {
  const todo = await Todo.create({
    title: req.body.title,
    UserId: req.user.id,
  });
  res.json(todo);
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  await Todo.update({ title, completed }, { where: { id, UserId: req.user.id } });
  res.json({ message: 'Updated' });
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.destroy({ where: { id, UserId: req.user.id } });
  res.json({ message: 'Deleted' });
};
