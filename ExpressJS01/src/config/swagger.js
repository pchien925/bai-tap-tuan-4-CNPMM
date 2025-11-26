const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "API Documentation", version: "1.0.0" },
    servers: [{ url: process.env.API_URL || `http://localhost:${process.env.PORT}/v1/api` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger Docs chạy tại: http://localhost:${process.env.PORT || 8000}/docs`);
}

module.exports = { swaggerDocs };
