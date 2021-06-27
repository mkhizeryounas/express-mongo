const swaggerJsdoc = require('swagger-jsdoc');
const { version } = require('../../package.json');
const swaggerUi = require('swagger-ui-express');
const { BASE_URL, SWAGGER } = require('../config/keys');

module.exports = (app) => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: SWAGGER.APP_NAME,
        version: version,
        description: SWAGGER.DESCRIPTION,
      },
      servers: [
        {
          url: BASE_URL,
        },
      ],
    },
    apis: ['./src/routes/*.js'],
  };
  const openapiSpecification = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
};
