import { mockmcpAuth } from "./mockmcpAuth.js";
import { validateMcpAuthData, } from "./validateMcpAuthData.js";
export function registerMcpAuthWebSocketRoute(fastify, sessionManager) {
    fastify.register(async function (fastify) {
        fastify.get("/command/mcp/auth", { websocket: true }, (socket, req) => {
            console.log("websocket open,url=", req.url);
            socket.on("message", async (message) => {
                try {
                    const data = JSON.parse(message.toString());
                    console.log("websocket message,data=", data);
                    const { sessionId: sessionId } = data;
                    if (!sessionId) {
                        socket.send(JSON.stringify({
                            type: "error",
                            message: "Missing required parameters: id must be provided",
                        }));
                        socket.close();
                        return;
                    }
                    try {
                        let { args, sessionId } = validateMcpAuthData(data);
                        const stream = await mockmcpAuth(sessionId, sessionManager, args || "");
                        const reader = stream.getReader();
                        try {
                            while (true) {
                                const { done, value } = await reader.read();
                                if (done) {
                                    socket.send(JSON.stringify({
                                        sessionId,
                                        type: "close",
                                        message: "Authentication process completed",
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
                        }
                        catch (error) {
                            console.error(error);
                            socket.send(JSON.stringify({
                                sessionId,
                                type: "error",
                                message: `Stream reading error: ${error instanceof Error ? error.message : String(error)}`,
                            }));
                        }
                        finally {
                            reader.releaseLock();
                        }
                    }
                    catch (error) {
                        console.error(error);
                        socket.send(JSON.stringify({
                            sessionsessionId: sessionId,
                            type: "error",
                            message: `Server error: ${error instanceof Error ? error.message : String(error)}`,
                        }));
                        socket.send(JSON.stringify({
                            sessionId: sessionId,
                            type: "close",
                            message: "WebSocket connection closed. Send { args:string,sessionId:string} to start mcp authentication",
                        }));
                    }
                }
                catch (error) {
                    console.error(error);
                    socket.send(JSON.stringify({
                        type: "error",
                        message: `Server error: ${error instanceof Error ? error.message : String(error)}`,
                    }));
                    socket.send(JSON.stringify({
                        type: "close",
                        message: "WebSocket connection closed. Send { args:string,sessionId:string} to start mcp authentication",
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
//# sourceMappingURL=registerMcpAuthWebSocketRoute.js.map