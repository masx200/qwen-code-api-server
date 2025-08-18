export const quitRequestSchema = {
    type: "object",
    properties: {
        sessionId: { type: "string", description: "会话ID" },
    },
    required: ["sessionId"],
    additionalProperties: false,
};
//# sourceMappingURL=quitRequestSchema.js.map