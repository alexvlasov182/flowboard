import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import {Express} from "express";

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "FlowBoard API",
        version: "1.0.0",
      },
    },
    apis: ["src/modules/**/*.ts"], // auto-scan all route files
  };

  const swaggerSpec = swaggerJSDoc(options);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}