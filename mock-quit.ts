import { quitCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/quitCommand.js";
import type { CommandContext } from "@qwen-code/qwen-code/dist/src/ui/commands/types.js";
import type { HistoryItemAbout } from "@qwen-code/qwen-code/dist/src/ui/types.js";
import type { SessionManager } from "./sessions.js";

export async function mockQuit(
  model: string,
  sessionId: string,
  sessionManager: SessionManager,
): Promise<{ itemData?: HistoryItemAbout; baseTimestamp?: number }> {
  const result: { itemData?: HistoryItemAbout; baseTimestamp?: number } = {};
  const context: CommandContext = {
    session: {
      stats: sessionManager.sessions.get(sessionId),
      sessionShellAllowlist: sessionManager.sessionShellAllowlist.get(
        sessionId,
      ),
    },
    services: {
      settings: {
        merged: {
          selectedAuthType: "openai",
        },
      },
      config: {
        getModel() {
          return model;
        },
      },
    },
    ui: {
      addItem(itemData: HistoryItemAbout, baseTimestamp): void {
        result.itemData = itemData as HistoryItemAbout;
        result.baseTimestamp = baseTimestamp;
      },
    },
  } as CommandContext;
  if (typeof quitCommand.action === "function") {
    await quitCommand.action(context, "");
  } else {
    throw new Error("quitCommand.action is not a function");
  }
  return result;
}
