const swaggerJsdoc = require('swagger-jsdoc');
const { name, version } = require('../../package.json');
const swaggerUi = require('swagger-ui-express');

module.exports = (app) => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: name,
        version: version,
      },
    },
    apis: ['./src/routes/*.js'],
  };
  const openapiSpecification = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
};
