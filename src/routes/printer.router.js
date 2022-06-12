const router = require("express").Router();
const printerController = require("../controllers/printer.controller");

router.get("/", (req, res) => {
  res.status(400).json({
    statusCode: 400,
    message: "Se requiere el nombre del controlador.",
  });
});

router.get("/:method", printerController.generic);

module.exports = router;
