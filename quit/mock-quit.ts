import { quitCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/quitCommand.js";
import type {
  CommandContext,
  QuitActionReturn,
} from "@qwen-code/qwen-code/dist/src/ui/commands/types.js";
import type { SessionManager } from "../session/sessions.js";

export async function mockQuit(
  sessionId: string,
  sessionManager: SessionManager,
): Promise<{
  type: string;
  messages: {
    type: string;
    text?: string | undefined;
    id: number;
    duration?: undefined | string;
  }[];
}> {
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
      config: {},
    },
    ui: {},
  } as CommandContext;
  if (typeof quitCommand.action === "function") {
    return (await quitCommand.action(context, "")) as QuitActionReturn;
  } else {
    throw new Error("quitCommand.action is not a function");
  }
}
