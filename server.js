const express = require('express');
const app = express();
const { sequelize } = require('./db');
const musiciansRoutes = require('./routes/musicians');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/musicians', musiciansRoutes);

app.listen(port, () => {
  sequelize.sync();
  console.log(`Listening on port ${port}`);
});
