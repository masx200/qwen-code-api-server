import { mcpCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/mcpCommand.js";
import type { CommandContext } from "@qwen-code/qwen-code/dist/src/ui/commands/types.js";
import type { HistoryItem } from "@qwen-code/qwen-code/dist/src/ui/types.js";
import type { SessionManager } from "../session/SessionManager.js";

export async function mockmcpRefresh(
  sessionId: string,
  sessionManager: SessionManager,
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
  const session = sessionManager.sessions.get(sessionId);
  if (!session) {
    throw new Error("Session not found");
  }
  const refreshCommand = mcpCommand.subCommands?.find(
    (command) => command.name === "refresh",
  );
  if (typeof refreshCommand?.action === "function") {
    return new ReadableStream<{
      type?: string;
      messageType?: string;
      content?: string;
      itemData?: Omit<HistoryItem, "id">;
      baseTimestamp?: number;
    }>({
      async start(controller) {
        const context: CommandContext = {
          session: {
            stats: session.session.stats,
            sessionShellAllowlist: session.session.sessionShellAllowlist,
          },
          services: {
            settings: {
              merged: {
                selectedAuthType: "openai",
              },
            },
            config: session.services.config,
          },
          ui: {
            addItem: function (itemData, baseTimestamp) {
              const result: {
                itemData?: Omit<HistoryItem, "id">;
                baseTimestamp?: number;
              } = {};
              result.itemData = itemData;
              result.baseTimestamp = baseTimestamp;
              controller.enqueue(result);
              return 0;
            },
          },
        } as CommandContext;
        if (typeof refreshCommand?.action === "function") {
          const slashcommandactionreturn = await refreshCommand?.action(
            context,
            args,
          );
          if (slashcommandactionreturn) {
            controller.enqueue(slashcommandactionreturn);
            controller.close();
          } else {
            controller.error("refreshCommand.action has no return");
          }
        } else {
          controller.error("refreshCommand.action is not a function");
        }
      },
    });
  } else {
    throw new Error("refreshCommand.action is not a function");
  }
}
