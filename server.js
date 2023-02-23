const express = require('express');
const app = express();
const { Musician } = require('./Musician');
const { sequelize } = require('./db');

const port = 3000;

app.get('/musicians', async (req, res) => {
  try {
    const data = await Musician.findAll();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/musicians/:id', async (req, res) => {
  try {
    const data = await Musician.findByPk(req.params.id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  sequelize.sync();
  console.log(`Listening on port ${port}`);
});
