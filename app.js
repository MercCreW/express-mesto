const express = require('express');
const path = require('path');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Port is ${PORT}`);
});
