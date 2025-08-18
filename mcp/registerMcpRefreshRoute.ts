import type { FastifyInstance } from "fastify";
import * as z from "zod";
import type { JSONSchema } from "zod/v4/core";
import type { SessionManager } from "../session/SessionManager.js";
import { mockmcpRefresh } from "./mockmcpRefresh.js";
import {
  type McprefreshData,
  validateMcprefreshData,
} from "./validateMcprefreshData.js";
export function registerMcprefreshRouteWebSocket(
  fastify: FastifyInstance,
  sessionManager: SessionManager,
) {
  fastify.register(async function (fastify) {
    fastify.get("/command/mcp/refresh", { websocket: true }, (socket, req) => {
      console.log("websocket open,url=", req.url);
      socket.on("message", async (message: any) => {
        try {
          // 解析客户端发送的消息
          const data = JSON.parse(message.toString()) as McprefreshData;

          console.log("websocket message,data=", data);
          const { sessionId } = data;
          if (!sessionId) {
            socket.send(
              JSON.stringify({
                type: "error",
                message:
                  "Missing required parameters: sessionId must be provided",
              }),
            );
            socket.close();
            return;
          }
          try {
            let { args, sessionId } = validateMcprefreshData(data);

            // 调用mockmcprefresh函数获取可读流
            const stream = await mockmcpRefresh(
              sessionId,
              sessionManager,
              args || "",
            );

            // 读取流中的数据并发送给客户端
            const reader = stream.getReader();

            try {
              while (true) {
                const { done, value } = await reader.read();

                if (done) {
                  socket.send(
                    JSON.stringify({
                      sessionId,
                      type: "close",
                      message: "mcp refresh process completed",
                    }),
                  );
                  break;
                }

                if (value) {
                  socket.send(
                    JSON.stringify({
                      sessionId,
                      type: "data",
                      data: value,
                    }),
                  );
                }
              }
            } catch (error) {
              console.error(error);
              socket.send(
                JSON.stringify({
                  sessionId,
                  type: "error",
                  message: `Stream reading error: ${
                    error instanceof Error ? error.message : String(error)
                  }`,
                }),
              );
            } finally {
              reader.releaseLock();
            }
          } catch (error) {
            console.error(error);
            socket.send(
              JSON.stringify({
                sessionId,
                type: "error",
                message: `Server error: ${
                  error instanceof Error ? error.message : String(error)
                }`,
              }),
            );

            // 发送连接成功消息
            socket.send(
              JSON.stringify({
                sessionId,
                type: "close",
                message:
                  "WebSocket connection closed. Send { args:string,sessionId:string} to start mcp refresh.",
              }),
            );
          }
        } catch (error) {
          console.error(error);
          socket.send(
            JSON.stringify({
              type: "error",
              message: `Server error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            }),
          );

          // 发送连接成功消息
          socket.send(
            JSON.stringify({
              type: "close",
              message:
                "WebSocket connection closed. Send { args:string,sessionId:string} to start mcp refresh.",
            }),
          );
          socket.close();
        }
      });

      socket.on("close", () => {
        console.log("WebSocket connection closed");
      });

      socket.on("error", (error: any) => {
        console.error("WebSocket error:", error);
      });
    });
  });
}
// console.log(zodtojsonSchema(mcprefreshRequestSchema));
export function zodtojsonSchema(schema: z.ZodTypeAny): JSONSchema.BaseSchema {
  return Object.fromEntries(
    Object.entries(z.toJSONSchema(schema)).filter(([key]) => key !== "$schema"),
  );
}
