import { Config } from "@qwen-code/qwen-code-core/dist/src/config/config.js";
import { mcpCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/mcpCommand.js";
import { creategeminiconfig } from "./gemini.js";
import { createcontext } from "./mock-mcp.js";
export async function mockmcpAuth(cwd, argv, args = "") {
  const authCommand = mcpCommand.subCommands?.find((command) =>
    command.name === "auth"
  );
  if (typeof authCommand?.action === "function") {
    return new ReadableStream({
      async start(controller) {
        const config = await creategeminiconfig(cwd, argv);
        const context = createcontext(
          config,
          function (itemData, baseTimestamp) {
            const result = {};
            result.itemData = itemData;
            result.baseTimestamp = baseTimestamp;
            controller.enqueue(result);
            return 0;
          },
        );
        if (typeof authCommand?.action === "function") {
          const slashcommandactionreturn = await authCommand?.action(
            context,
            args,
          );
          if (slashcommandactionreturn) {
            controller.enqueue(slashcommandactionreturn);
            controller.close();
          } else {
            controller.error("authCommand.action has no return");
          }
        } else {
          controller.error("authCommand.action is not a function");
        }
      },
    });
  } else {
    throw new Error("authCommand.action is not a function");
  }
}
//# sourceMappingURL=mockmcpAuth.js.map
