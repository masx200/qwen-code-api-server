import { Config } from "@qwen-code/qwen-code-core/dist/src/config/config.js";
import { mcpCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/mcpCommand.js";
import { creategeminiconfig } from "./gemini.js";
import { createcontext } from "./mock-mcp.js";
export async function mockmcpRefresh(cwd, argv, args = "") {
    const refreshCommand = mcpCommand.subCommands?.find((command) => command.name === "refresh");
    if (typeof refreshCommand?.action === "function") {
        return new ReadableStream({
            async start(controller) {
                const config = (await creategeminiconfig(cwd, argv));
                const context = createcontext(config, function (itemData, baseTimestamp) {
                    const result = {};
                    result.itemData = itemData;
                    result.baseTimestamp = baseTimestamp;
                    controller.enqueue(result);
                    return 0;
                });
                if (typeof refreshCommand?.action === "function") {
                    const slashcommandactionreturn = await refreshCommand?.action(context, args);
                    if (slashcommandactionreturn) {
                        controller.enqueue(slashcommandactionreturn);
                        controller.close();
                    }
                    else {
                        controller.error("refreshCommand.action has no return");
                    }
                }
                else {
                    controller.error("refreshCommand.action is not a function");
                }
            },
        });
    }
    else {
        throw new Error("refreshCommand.action is not a function");
    }
}
//# sourceMappingURL=mockmcpRefresh.js.map