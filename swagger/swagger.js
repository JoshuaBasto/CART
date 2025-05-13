const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cart API',
      version: '1.0.0',
      description: 'CRUD API for Cart and Product Models'
    },
    servers: [{ url: 'http://localhost:3100' }]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  specs
};
