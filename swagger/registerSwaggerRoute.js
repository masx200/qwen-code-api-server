import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { swaggerOptions } from "./swagger.js";
export async function registerSwaggerPlugin(fastify) {
    await fastify.register(fastifySwagger, swaggerOptions);
    await fastify.register(fastifySwaggerUi, {
        routePrefix: "/documentation", // UI 访问路径
        uiConfig: {
            docExpansion: "list", // 折叠文档层级
        },
    });
}
//# sourceMappingURL=registerSwaggerRoute.js.map