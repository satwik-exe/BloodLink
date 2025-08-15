
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BloodLink API',
      version: '1.0.0'
    },
    servers: [{ url: '/' }]
  },
  apis: ['./src/routes/*.js']
};

export const specs = swaggerJSDoc(options);
