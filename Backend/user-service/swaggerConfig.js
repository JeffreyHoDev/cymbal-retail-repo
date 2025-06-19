const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'User Service API', // Your API title
      version: '1.0.0', // Your API version
      description: 'API documentation for your User Service Endpoints', // A brief description
    },
    servers: [
      {
        url: 'http://localhost:3000', // Your API base URL
        description: 'Development server',
      },
    ],
  },
  apis: ['./*.js'], // Path to your API route files (adjust as needed)
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;