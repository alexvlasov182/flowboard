import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "FlowBoard API",
        version: "1.0.0",
      },
      components: {
        schemas: {
          SignupInput: {
            type: "object",
            properties: {
              name: { type: "string", example: "Alex" },
              email: { type: "string", example: "alex@example.com" },
              password: { type: "string", example: "supersecret" },
            },
            required: ["name", "email", "password"],
          },
          LoginInput: {
            type: "object",
            properties: {
              email: { type: "string", example: "alex@example.com" },
              password: { type: "string", example: "supersecret" },
            },
            required: ["email", "password"],
          },
          AuthResponse: {
            type: "object",
            properties: {
              user: {
                type: "object",
                properties: {
                  id: { type: "number", example: 1 },
                  name: { type: "string", example: "Alex" },
                  email: { type: "string", example: "alex@example.com" },
                  createdAt: { type: "string", format: "date-time" },
                },
              },
              token: { type: "string", example: "jwt.token.here" },
            },
          },
        },
      },
    },
    apis: ["src/modules/**/*.ts"], // scan all module route files
  };

  const swaggerSpec = swaggerJSDoc(options);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at http://localhost:4000/api/docs");
};
