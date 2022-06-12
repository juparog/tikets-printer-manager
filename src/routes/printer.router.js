const router = require("express").Router();
const printerController = require("../controllers/printer.controller");

router.get("/openCashDrawer", (req, res) =>
  printerController.openCashDrawer(req, res)
);

module.exports = router;
