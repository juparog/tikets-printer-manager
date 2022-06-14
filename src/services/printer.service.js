const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;

const selectMethod = async (printer, method, args) => {
  const { str, bool, table } = args;
  switch (method) {
    case 'print':
    case 'println':
    case 'setCharacterSet':
    case 'code128':
    case 'printQR':
      printer[method](str.toString().replaceAll('"', ''));
      break;
    case 'printImage':
      await printer[method](str);
      break;
    case 'upsideDown':
    case 'bold':
    case 'invert':
    case 'underline':
    case 'underlineThick':
      printer[method](Boolean(bool));
      break;
    case 'table':
    case 'tableCustom':
      printer[method](JSON.parse(table));
      break;
    default:
      printer[method]();
      break;
  }
};

module.exports.generic = (method, params, args) => {
  const {
    type,
    connection,
    characterSet,
    removeSpecialCharacters,
    lineCharacter,
    timeout,
  } = params;

  const printer = new ThermalPrinter({
    type: PrinterTypes[type || 'STAR'], // Tipo de impresora: 'STAR' o 'EPSON'
    interface: connection || 'cp://xxx.xxx.xxx.xxx', // interfaz de la impresora
    characterSet: characterSet || 'SLOVENIA', // Conjunto de caracteres de la impresora - predeterminado: ESLOVENIA
    removeSpecialCharacters: removeSpecialCharacters || false, // Elimina caracteres especiales
    lineCharacter: lineCharacter || '=', // Establecer carácter para líneas - predeterminado: "-"
    options: {
      // Opciones adicionales
      timeout: timeout || 3000, // Tiempo de espera de conexión (ms)
    },
  });
  return new Promise((resolve, reject) => {
    printer
      .isPrinterConnected()
      .then((isConnected) => {
        if (true) {
          if (printer[method]) {
            selectMethod(printer, method, args);
            resolve({
              success: true,
              statusCode: 200,
              message: `Metodo [${method}] completado.`,
            });
          } else {
            printer.beep();
            resolve({
              success: false,
              statusCode: 400,
              message: `Método [${method}] no definido.`,
            });
          }
        } else {
          resolve({
            success: false,
            statusCode: 400,
            message: 'Impresora desconectada.',
          });
        }
      })
      .catch((error) => {
        reject({
          success: false,
          statusCode: 500,
          message: 'Error conectando con la impresora.',
          data: {
            error: error.message || error,
          },
        });
      });
  });
};
