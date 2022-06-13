const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: `${process.env.APP_NAME || 'Printer Manger'} - REST API`,
    version: '1.0.0',
    description: `${process.env.APP_DESCRIPTION}`,
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html'
    },
    contact: {
      name: `${process.env.APP_ONWER}`,
      url: `${process.env.APP_SUPPORTEMAIL}`
    }
  },
  servers: [
    {
      url: `${process.env.APP_URL}`,
      description: `${process.env.APP_URLDESCRIPTION}`,
      variables: {
        port: {
          default: `${process.env.PORT || 3000}`
        },
        basePath: {
          default: `${process.env.API_BASEPATH || '/api'}`
        }
      }
    }
  ]
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [`${path.join(__dirname, '../docs/*.yaml')}`]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
