import { mcpCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/mcpCommand.js";
export async function mockmcpRefresh(sessionId, sessionManager, args = "") {
  const session = sessionManager.sessions.get(sessionId);
  if (!session) {
    throw new Error("Session not found");
  }
  const refreshCommand = mcpCommand.subCommands?.find((command) =>
    command.name === "refresh"
  );
  if (typeof refreshCommand?.action === "function") {
    return new ReadableStream({
      async start(controller) {
        const context = {
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
              const result = {};
              result.itemData = itemData;
              result.baseTimestamp = baseTimestamp;
              controller.enqueue(result);
              return 0;
            },
          },
        };
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
//# sourceMappingURL=mockmcpRefresh.js.map
