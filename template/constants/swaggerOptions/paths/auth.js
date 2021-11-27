module.exports = {
  "/auth": {
    post: {
      tags: ["login"],
      summary: "login api",
      description: "login",
      operationId: "login",
      parameters: [
        {
          in: "body",
          name: "data",
          type: "object",
          schema: {
            type: "object",
            properties: {
              phone: {
                type: "string",
                default: "0987654321"
              },
              password: {
                type: "string",
                default: "a12345678"
              }
            }
          },
        },
      ],
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
