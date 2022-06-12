const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

module.exports.openCashDrawer = (params) => {
  const {
    type,
    interface,
    characterSet,
    removeSpecialCharacters,
    lineCharacter,
    timeout,
  } = params;
  const printer = new ThermalPrinter({
    type: PrinterTypes[type || "STAR"], // Tipo de impresora: 'STAR' o 'EPSON'
    interface: interface || "cp://xxx.xxx.xxx.xxx", // interfaz de la impresora
    characterSet: characterSet || "SLOVENIA", // Conjunto de caracteres de la impresora - predeterminado: ESLOVENIA
    removeSpecialCharacters: removeSpecialCharacters || false, // Elimina caracteres especiales - predeterminado: falso
    lineCharacter: lineCharacter || "=", // Establecer carácter para líneas - predeterminado: "-"
    options: {
      // Opciones adicionales
      timeout: timeout || 3000, // Tiempo de espera de conexión (ms) [aplicable solo para impresoras de red] - predeterminado: 3000
    },
  });
  return new Promise((resolve, reject) => {
    printer
      .isPrinterConnected()
      .then((isConnected) => {
        if (isConnected) {
          printer.openCashDrawer();
          resolve({
            statusCode: 200,
            message: "Orden completada.",
          });
        } else {
          resolve({
            statusCode: 400,
            message: "Impresora desconectada.",
          });
        }
      })
      .catch((error) => {
        reject({
          statusCode: 500,
          message: "Error conectando con la impresora.",
          data: {
            error: error.message || error,
          },
        });
      });
  });
};
