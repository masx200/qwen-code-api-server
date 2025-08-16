import { Config } from "@qwen-code/qwen-code-core/dist/src/config/config.js";
import { mcpCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/mcpCommand.js";
import type { CommandContext } from "@qwen-code/qwen-code/dist/src/ui/commands/types.js";
import type { HistoryItem } from "@qwen-code/qwen-code/dist/src/ui/types.js";
import { creategeminiconfig } from "./gemini.js";
import { createcontext } from "./mock-mcp.js";

export async function mockmcpAuth(
  cwd: string,
  argv: string[],
  args: string = "",
): Promise<
  ReadableStream<{
    type?: string;
    messageType?: string;
    content?: string;
    itemData?: Omit<HistoryItem, "id">;
    baseTimestamp?: number;
  }>
> {
  const authCommand = mcpCommand.subCommands?.find(
    (command) => command.name === "auth",
  );
  if (typeof authCommand?.action === "function") {
    return new ReadableStream<{
      type?: string;
      messageType?: string;
      content?: string;
      itemData?: Omit<HistoryItem, "id">;
      baseTimestamp?: number;
    }>({
      async start(controller) {
        const config = (await creategeminiconfig(cwd, argv)) as Config;
        const context: CommandContext = createcontext(
          config,
          function (itemData, baseTimestamp) {
            const result: {
              itemData?: Omit<HistoryItem, "id">;
              baseTimestamp?: number;
            } = {};
            result.itemData = itemData;
            result.baseTimestamp = baseTimestamp;
            controller.enqueue(result);
            return 0;
          },
        ) as CommandContext;
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
