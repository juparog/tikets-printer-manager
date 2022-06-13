const router = require('express').Router();
const printerController = require('../controllers/printer.controller');

router.get('/', (req, res) => {
  res.status(400).json({
    success: false,
    statusCode: 400,
    message: 'Se requiere el nombre del controlador.',
  });
});

router.post('/:method', printerController.generic);

module.exports = router;
