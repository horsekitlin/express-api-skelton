module.exports = {
  User: {
    required: ["name", "_id", "companies"],
    properties: {
      _id: {
        type: "integer",
        uniqueItems: true,
      },
      isPublic: {
        type: "boolean",
      },
      name: {
        type: "string",
      },
      books: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            amount: {
              type: "number",
            },
          },
        },
      },
      companies: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
  Users: {
    type: "array",
    $ref: "#/definitions/User",
  },
};