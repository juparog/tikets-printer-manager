const router = require('express').Router();
const printerRouter =  require('./printer.router');

router.get('/', (req, res) => {
  res.send('Printer Manager Api')
});
router.use('/printer', printerRouter);

module.exports  = router;
