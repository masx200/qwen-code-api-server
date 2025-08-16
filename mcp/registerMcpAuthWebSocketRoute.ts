import type { FastifyInstance } from "fastify";
import { mockmcpAuth } from "./mock-mcp.js";

export function registerMcpAuthWebSocketRoute(fastify: FastifyInstance) {
  // 注册WebSocket路由用于MCP认证
  fastify.register(async function (fastify) {
    fastify.get("/command/mcp/auth", { websocket: true }, (socket, req) => {
      console.log("websocket open,url=", req.url);
      socket.on("message", async (message: any) => {
        try {
          // 解析客户端发送的消息
          const data = JSON.parse(message.toString()) as {
            cwd: string;
            argv: string[];
            args?: string;
            id?: string;
          };
          const { cwd, argv, args, id } = data;
          if (!id) {
            socket.send(
              JSON.stringify({
                type: "error",
                message: "Missing required parameters: id must be provided",
              }),
            );
            return;
          }

          if (!cwd || !Array.isArray(argv)) {
            socket.send(
              JSON.stringify({
                id: id,
                type: "error",
                message:
                  "Missing required parameters: cwd and argv must be provided",
              }),
            );
            return;
          }

          // 调用mockmcpAuth函数获取可读流
          const stream = await mockmcpAuth(cwd, argv, args || "");

          // 读取流中的数据并发送给客户端
          const reader = stream.getReader();

          try {
            while (true) {
              const { done, value } = await reader.read();

              if (done) {
                socket.send(
                  JSON.stringify({
                    id,
                    type: "close",
                    message: "Authentication process completed",
                  }),
                );
                break;
              }

              if (value) {
                socket.send(
                  JSON.stringify({
                    id,
                    type: "data",
                    data: value,
                  }),
                );
              }
            }
          } catch (error) {
            socket.send(
              JSON.stringify({
                id,
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
              type: "error",
              message: `Server error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            }),
          );
        }
      });

      socket.on("close", () => {
        console.log("WebSocket connection closed");
      });

      socket.on("error", (error: any) => {
        console.error("WebSocket error:", error);
      });

      // 发送连接成功消息
      socket.send(
        JSON.stringify({
          type: "open",
          message:
            "WebSocket connection established. Send {cwd, argv, args,id} to start authentication.",
        }),
      );
    });
  });
}
