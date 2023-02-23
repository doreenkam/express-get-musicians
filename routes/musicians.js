const router = require('express').Router();
const { Musician } = require('../Musician');

router.get('/', async (req, res) => {
  try {
    const data = await Musician.findAll();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Musician.findByPk(req.params.id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, instrument } = req.body;
    const data = await Musician.create({ name, instrument });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Musician.destroy({ where: { id } });
    res.status(200).send('Musician Deleted!');
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
