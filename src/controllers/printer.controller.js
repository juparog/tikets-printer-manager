const printerService = require("../services/printer.service");

module.exports.generic = (req, res) => {
  const { method } = req.params;
  printerService
    .generic(method, req.body || {})
    .then((response) => {
      res.status(response.statusCode || 200).json(response || {});
    })
    .catch((error) => {
      res.status(error.statusCode || 500).json(error || {});
    });
};
