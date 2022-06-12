const printerService = require("../services/printer.service");

module.exports.openCashDrawer = (req, res) => {
  printerService
    .openCashDrawer(req.body || {})
    .then((response) => {
      res.status(response.statusCode || 200).json(response || {});
    })
    .catch((error) => {
      res.status(error.statusCode || 500).json(error || {});
    });
};
