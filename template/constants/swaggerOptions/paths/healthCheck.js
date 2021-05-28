module.exports = {
  "/health-check": {
    get: {
      tags: ["healthCheck"],
      summary: "healthCheck api",
      description: "healthCheck",
      operationId: "healthCheck",
      consumes: ["application/json"],
      produces: ["application/json"],
      parameters: [],
      responses: {
        200: {
          description: "OK",
          schema: {
            type: "string",
            default: "OK"
          },
        },
      },
    }
  },
};