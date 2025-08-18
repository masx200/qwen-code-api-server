import * as z from "zod";
import { mockmcpRefresh } from "./mockmcpRefresh.js";
import { validateMcprefreshData } from "./validateMcprefreshData.js";
export function registerMcprefreshRouteWebSocket(fastify, sessionManager) {
  fastify.register(async function (fastify) {
    fastify.get("/command/mcp/refresh", { websocket: true }, (socket, req) => {
      console.log("websocket open,url=", req.url);
      socket.on("message", async (message) => {
        try {
          const data = JSON.parse(message.toString());
          console.log("websocket message,data=", data);
          const { sessionId } = data;
          if (!sessionId) {
            socket.send(JSON.stringify({
              type: "error",
              message:
                "Missing required parameters: sessionId must be provided",
            }));
            socket.close();
            return;
          }
          try {
            let { args, sessionId } = validateMcprefreshData(data);
            const stream = await mockmcpRefresh(
              sessionId,
              sessionManager,
              args || "",
            );
            const reader = stream.getReader();
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) {
                  socket.send(JSON.stringify({
                    sessionId,
                    type: "close",
                    message: "mcp refresh process completed",
                  }));
                  break;
                }
                if (value) {
                  socket.send(JSON.stringify({
                    sessionId,
                    type: "data",
                    data: value,
                  }));
                }
              }
            } catch (error) {
              console.error(error);
              socket.send(JSON.stringify({
                sessionId,
                type: "error",
                message: `Stream reading error: ${
                  error instanceof Error ? error.message : String(error)
                }`,
              }));
            } finally {
              reader.releaseLock();
            }
          } catch (error) {
            console.error(error);
            socket.send(JSON.stringify({
              sessionId,
              type: "error",
              message: `Server error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            }));
            socket.send(JSON.stringify({
              sessionId,
              type: "close",
              message:
                "WebSocket connection closed. Send { args:string,sessionId:string} to start mcp refresh.",
            }));
          }
        } catch (error) {
          console.error(error);
          socket.send(JSON.stringify({
            type: "error",
            message: `Server error: ${
              error instanceof Error ? error.message : String(error)
            }`,
          }));
          socket.send(JSON.stringify({
            type: "close",
            message:
              "WebSocket connection closed. Send { args:string,sessionId:string} to start mcp refresh.",
          }));
          socket.close();
        }
      });
      socket.on("close", () => {
        console.log("WebSocket connection closed");
      });
      socket.on("error", (error) => {
        console.error("WebSocket error:", error);
      });
    });
  });
}
export function zodtojsonSchema(schema) {
  return Object.fromEntries(
    Object.entries(z.toJSONSchema(schema)).filter(([key]) => key !== "$schema"),
  );
}
//# sourceMappingURL=registerMcpRefreshRoute.js.map
