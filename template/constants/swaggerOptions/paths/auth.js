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
          type: "object",
          schema: {
            type: "object",
            properties: {
              account: {
                type: "string",
                default: "mockUser"
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