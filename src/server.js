const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(cors());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Tikect Printer Manager')
});

app.listen(port, () => {
  console.log(`Aplicación escuchando en el puerto ${port}`)
});