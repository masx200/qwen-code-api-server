import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { swaggerOptions } from "./swagger.js";
export async function registerSwaggerPlugin(fastify) {
    await fastify.register(fastifySwagger, swaggerOptions);
    await fastify.register(fastifySwaggerUi, {
        routePrefix: "/documentation",
        uiConfig: {
            docExpansion: "list",
        },
    });
}
//# sourceMappingURL=registerSwaggerPlugin.js.map