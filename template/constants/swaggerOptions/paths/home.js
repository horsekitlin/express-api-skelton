module.exports = {
  "/home": {
    get: {
      tags: ["Home"],
      summary: "home api",
      description: "test home description",
      operationId: "home",
      consumes: ["application/json"],
      produces: ["application/json"],
      parameters: [
        {
          in: "query",
          name: "test",
          description: "test value",
          required: false,
          schema: {
            type: "string",
          },
        },
        {
          in: "header",
          name: "Authorization",
          description: "Bearer ${{token}}",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        400: {
          description: "Invalid input",
        },
        200: {
          description: "OK",
          schema: {
            type: "object",
            properties: {
              title: {
                type: "string",
                default: "home",
              },
              test: {
                type: "string",
                default: undefined,
              },
            },
          },
        },
      },
    },
  },
};