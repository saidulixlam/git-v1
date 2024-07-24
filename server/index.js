const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

let users = [];

app.post('/users', (req, res) => {
  const { name, age } = req.body;
  users.push({ name, age });
  res.status(201).send({ message: 'User added successfully' });
});

app.get('/users', (req, res) => {
  res.status(200).json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
