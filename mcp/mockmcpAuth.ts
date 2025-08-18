import { mcpCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/mcpCommand.js";
import type { CommandContext } from "@qwen-code/qwen-code/dist/src/ui/commands/types.js";
import type { HistoryItem } from "@qwen-code/qwen-code/dist/src/ui/types.js";
import type { SessionManager } from "../session/SessionManager.js";

export async function mockmcpAuth(
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
