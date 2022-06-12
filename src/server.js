const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const indexRouter = require('./routes/index');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Tikect Printer Manager');
});

app.use('/api', indexRouter);

app.listen(port, () => {
  console.log(`Aplicación escuchando en el puerto ${port}`);
});
