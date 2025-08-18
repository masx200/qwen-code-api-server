import type { FastifyInstance } from "fastify";
import { mockmcpAuth } from "./mockmcpAuth.js";
import {
  type McpAuthData,
  validateMcpAuthData,
} from "./validateMcpAuthData.js";
import type { SessionManager } from "../session/SessionManager.js";
export function registerMcpAuthWebSocketRoute(
  fastify: FastifyInstance,
  sessionManager: SessionManager,
) {
  // 注册WebSocket路由用于MCP认证
  fastify.register(async function (fastify) {
    fastify.get("/command/mcp/auth", { websocket: true }, (socket, req) => {
      console.log("websocket open,url=", req.url);
      socket.on("message", async (message: any) => {
        try {
          // 解析客户端发送的消息
          const data = JSON.parse(message.toString()) as McpAuthData;

          console.log("websocket message,data=", data);
          const { sessionId: sessionId } = data;
          if (!sessionId) {
            socket.send(
              JSON.stringify({
                type: "error",
                message: "Missing required parameters: id must be provided",
              }),
            );
            socket.close();
            return;
          }
          try {
            let { args, sessionId } = validateMcpAuthData(data);

            // 调用mockmcpAuth函数获取可读流
            const stream = await mockmcpAuth(
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
                      message: "Authentication process completed",
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
                sessionId: sessionId,
                type: "error",
                message: `Server error: ${
                  error instanceof Error ? error.message : String(error)
                }`,
              }),
            );

            // 发送连接成功消息
            socket.send(
              JSON.stringify({
                sessionId: sessionId,
                type: "close",
                message:
                  "WebSocket connection closed. Send { args:string,sessionId:string} to start mcp authentication",
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
                "WebSocket connection closed. Send { args:string,sessionId:string} to start mcp authentication",
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
