const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const swaggerUI = require('swagger-ui-express');
const indexRouter = require('./routes/index');

dotenv.config();
const swaggerSpec = require('./config/swaggerSpec');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Tikect Printer Manager');
});

app.use(process.env.API_BASEPATH || '/api', indexRouter);

app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, { explorer: true })
);

app.listen(port, () => {
  console.log(`Aplicación escuchando en el puerto ${port}`);
});
