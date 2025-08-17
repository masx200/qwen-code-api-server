import type { FastifyInstance } from "fastify";
import * as z from "zod";
import os from "os";
import type { JSONSchema } from "zod/v4/core";
import { validateMcprefreshData } from "./validateMcprefreshData.js";
import { mockmcpRefresh } from "./mockmcpRefresh.js";
export function registerMcprefreshRoute(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.get("/command/mcp/refresh", { websocket: true }, (socket, req) => {
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

          console.log("websocket message,data=", data);
          const { id } = data;
          if (!id) {
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
            let { cwd, argv, args, id } = validateMcprefreshData(data);
            cwd = cwd.length ? cwd : os.homedir();
            if (!cwd || !Array.isArray(argv)) {
              socket.send(
                JSON.stringify({
                  id: id,
                  type: "error",
                  message:
                    "Missing required parameters: cwd and argv must be provided",
                }),
              );
              //socket.close()
              return;
            }

            // 调用mockmcprefresh函数获取可读流
            const stream = await mockmcpRefresh(cwd, argv, args || "");

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
                      message: "mcp refresh process completed",
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
              console.error(error);
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
                id,
                type: "error",
                message: `Server error: ${
                  error instanceof Error ? error.message : String(error)
                }`,
              }),
            );

            // 发送连接成功消息
            socket.send(
              JSON.stringify({
                id,
                type: "close",
                message:
                  "WebSocket connection closed. Send {cwd:string, argv:string[], args:string,id:string} to start mcp refresh.",
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
                "WebSocket connection closed. Send {cwd:string, argv:string[], args:string,id:string} to start mcp refresh.",
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
