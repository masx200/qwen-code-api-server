import { mockmcpAuth } from "./mockmcpAuth.js";
import { validateMcpAuthData } from "./validateMcpAuthData.js";
import os from "os";
export function registerMcpAuthWebSocketRoute(fastify) {
    fastify.register(async function (fastify) {
        fastify.get("/command/mcp/auth", { websocket: true }, (socket, req) => {
            console.log("websocket open,url=", req.url);
            socket.on("message", async (message) => {
                try {
                    const data = JSON.parse(message.toString());
                    console.log("websocket message,data=", data);
                    const { id } = data;
                    if (!id) {
                        socket.send(JSON.stringify({
                            type: "error",
                            message: "Missing required parameters: id must be provided",
                        }));
                        socket.close();
                        return;
                    }
                    try {
                        let { cwd, argv, args, id } = validateMcpAuthData(data);
                        cwd = cwd.length ? cwd : os.homedir();
                        if (!cwd || !Array.isArray(argv)) {
                            socket.send(JSON.stringify({
                                id: id,
                                type: "error",
                                message: "Missing required parameters: cwd and argv must be provided",
                            }));
                            return;
                        }
                        const stream = await mockmcpAuth(cwd, argv, args || "");
                        const reader = stream.getReader();
                        try {
                            while (true) {
                                const { done, value } = await reader.read();
                                if (done) {
                                    socket.send(JSON.stringify({
                                        id,
                                        type: "close",
                                        message: "Authentication process completed",
                                    }));
                                    break;
                                }
                                if (value) {
                                    socket.send(JSON.stringify({
                                        id,
                                        type: "data",
                                        data: value,
                                    }));
                                }
                            }
                        }
                        catch (error) {
                            console.error(error);
                            socket.send(JSON.stringify({
                                id,
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
                            id,
                            type: "error",
                            message: `Server error: ${error instanceof Error ? error.message : String(error)}`,
                        }));
                        socket.send(JSON.stringify({
                            id,
                            type: "close",
                            message: "WebSocket connection closed. Send {cwd:string, argv:string[], args:string,id:string} to start authentication.",
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
                        message: "WebSocket connection closed. Send {cwd:string, argv:string[], args:string,id:string} to start authentication.",
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