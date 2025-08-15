import { type SwaggerOptions } from "@fastify/swagger";
export const swaggerOptions: SwaggerOptions = {
  openapi: {
    info: {
      title: "Fastify API",
      description: "Building a blazing fast REST API",
      version: "1.0.0",
    },
  },
} satisfies SwaggerOptions;
