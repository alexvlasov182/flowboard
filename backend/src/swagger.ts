import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Express } from 'express';

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'FlowBoard API',
        version: '1.0.0',
      },
      components: {
        schemas: {
          SignupInput: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'Alex' },
              email: { type: 'string', example: 'alex@example.com' },
              password: { type: 'string', example: 'supersecret' },
            },
            required: ['name', 'email', 'password'],
          },
          LoginInput: {
            type: 'object',
            properties: {
              email: { type: 'string', example: 'alex@example.com' },
              password: { type: 'string', example: 'supersecret' },
            },
            required: ['email', 'password'],
          },
          AuthResponse: {
            type: 'object',
            properties: {
              user: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1 },
                  name: { type: 'string', example: 'Alex' },
                  email: { type: 'string', example: 'alex@example.com' },
                  createdAt: { type: 'string', format: 'date-time' },
                },
              },
              token: { type: 'string', example: 'jwt.token.here' },
            },
          },
          Page: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              title: { type: 'string', example: 'My first page' },
              content: { type: 'string', example: 'This is the page content' },
              userId: { type: 'number', example: 1 },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
          PageInput: {
            type: 'object',
            properties: {
              title: { type: 'string', example: 'New Page' },
              content: { type: 'string', example: 'Page details here' },
              userId: { type: 'number', example: 1 },
            },
            required: ['title', 'content', 'userId'],
          },
          User: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'Alex' },
              email: { type: 'string', example: 'alex@example.com' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
          CreateUserInput: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'Alex' },
              email: { type: 'string', example: 'alex@example.com' },
              password: { type: 'string', example: 'supersecret' },
            },
            required: ['name', 'email', 'password'],
          },
        },
      },
    },
    apis: ['src/modules/**/*.ts'], // scan all module route files
  };

  const swaggerSpec = swaggerJSDoc(options);
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger docs available at http://localhost:4000/api/docs');
};
