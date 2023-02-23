const express = require('express');
const app = express();
const { Musician } = require('./Musician');
const { sequelize } = require('./db');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post('/musicians', async (req, res) => {
  try {
    const { name, instrument } = req.body;
    const data = await Musician.create({ name, instrument });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.put('/musicians/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Musician.update(req.body, {
      where: { id },
    });
    const data = Musician.findByPk(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.delete('/musicians/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Musician.destroy({ where: { id } });
    res.status(200).send('Musician Deleted!');
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
app.listen(port, () => {
  sequelize.sync();
  console.log(`Listening on port ${port}`);
});
