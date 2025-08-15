// ESM
import fastifySwagger, { type SwaggerOptions } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import Fastify from "fastify";
import { mockAbout } from "./mock-about.js";

const fastify = Fastify({
  logger: true,
});

const swaggerOptions: SwaggerOptions = {
  openapi: {
    info: {
      title: "Fastify API",
      description: "Building a blazing fast REST API",
      version: "1.0.0",
    },
  },
} satisfies SwaggerOptions;
await fastify.register(fastifySwagger, swaggerOptions);

await fastify.register(fastifySwaggerUi, {
  routePrefix: "/documentation", // UI 访问路径
  uiConfig: {
    docExpansion: "list", // 折叠文档层级
  },
});

// 定义请求和响应的JSON Schema
const aboutRequestSchema = {
  type: "object",
  properties: {
    model: { type: "string", description: "模型名称" },
  },
  required: ["model"],
};

const aboutResponseSchema = {
  type: "object",
  properties: {
    success: { type: "boolean", description: "是否成功" },
    error: { type: "string", description: "错误信息" },
    message: { type: "string", description: "错误信息" },
    itemData: {
      type: "object",
      description: "show version info",
      properties: {
        type: { type: "string" },
        cliVersion: { type: "string" },
        osVersion: { type: "string" },
        modelVersion: { type: "string" },
        selectedAuthType: { type: "string" },
        gcpProject: { type: "string" },
      },
    },
    baseTimestamp: { type: "number", description: "基础时间戳" },
  },
};

// 注册路由
fastify.post(
  "/command/about",
  {
    schema: {
      description: "调用about命令获取模型信息",
      tags: ["command"],
      body: aboutRequestSchema,
      response: {
        200: aboutResponseSchema,
        500: aboutResponseSchema,
      },
    },
  },
  async (request, reply) => {
    try {
      const { model } = request.body as { model: string };
      const result = await mockAbout(model);
      // throw new Error("test error");
      return { ...result, success: true };
    } catch (error) {
      request.log.error(error);
      console.error(error);
      reply.status(500).send({
        success: false,
        error: "Internal server error",
        message: String(error),
      });
    }
  },
);
/**
 * Run the server!
 */
async function start() {
  try {
    console.log(
      "address",
      await fastify.listen({ port: 3000, host: "0.0.0.0" }),
    );
  } catch (err) {
    fastify.log.error(err);
    console.error(err);
    process.exit(1);
  }
}

fastify.ready().then(() => {
  console.log("document", fastify.swagger());
}, console.error);
start().then(console.log, console.error);
