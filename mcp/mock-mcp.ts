import { mcpCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/mcpCommand.js";
import type { CommandContext } from "@qwen-code/qwen-code/dist/src/ui/commands/types.js";

import { Config } from "@qwen-code/qwen-code-core/dist/src/config/config.js";
import { ToolRegistry } from "@qwen-code/qwen-code-core/dist/src/tools/tool-registry.js";
import type { HistoryItem } from "@qwen-code/qwen-code/dist/src/ui/types.js";

import type { SessionManager } from "../session/SessionManager.js";
export async function mockmcp(
  sessionId: string,
  sessionManager: SessionManager,
  args: string = ""
): Promise<{
  type?: string;
  messageType?: string;
  content?: string;
}> {
  const session = sessionManager.sessions.get(sessionId);
  if (!session) {
    throw new Error("Session not found");
  }
  const result: { itemData?: Omit<HistoryItem, "id">; baseTimestamp?: number } =
    {};
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
        result.itemData = itemData;
        result.baseTimestamp = baseTimestamp;
        return 0;
      },
    },
  } as CommandContext;

  if (typeof mcpCommand.action === "function") {
    const result2 = (await mcpCommand.action(context, args)) as {
      type?: string;
      messageType?: string;
      content?: string;
    };
    return result2;
  } else {
    throw new Error("mcpCommand.action is not a function");
  }
}

export async function mockmcpList(
  sessionId: string,
  sessionManager: SessionManager,
  args: string = ""
): Promise<{
  type?: string;
  messageType?: string;
  content?: string;
}> {
  const session = sessionManager.sessions.get(sessionId);
  if (!session) {
    throw new Error("Session not found");
  }
  const result: { itemData?: Omit<HistoryItem, "id">; baseTimestamp?: number } =
    {};
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
        result.itemData = itemData;
        result.baseTimestamp = baseTimestamp;
        return 0;
      },
    },
  } as CommandContext;

  const listCommand = mcpCommand.subCommands?.find(
    (command) => command.name === "list"
  );
  if (typeof listCommand?.action === "function") {
    return (await listCommand.action(context, args)) as {
      type?: string;
      messageType?: string;
      content?: string;
    };
  } else {
    throw new Error("listCommand.action is not a function");
  }
}

export function createcontext(
  config: Config,
  addItem: (itemData: Omit<HistoryItem, "id">, baseTimestamp: number) => number
) {
  const context: CommandContext = {
    services: {
      settings: {
        merged: {
          selectedAuthType: "openai",
        },
      },
      config: {
        getGeminiClient() {
          return config.getGeminiClient();
        },
        getPromptRegistry() {
          return config.getPromptRegistry();
        },
        getBlockedMcpServers() {
          return config.getBlockedMcpServers();
        },
        async getToolRegistry(): Promise<ToolRegistry> {
          return Promise.resolve(config.getToolRegistry());
        },
        getMcpServers() {
          return config.getMcpServers();
        },
      },
    },
    ui: {
      addItem(
        itemData: Omit<HistoryItem, "id">,
        baseTimestamp: number
      ): number {
        return addItem(itemData, baseTimestamp);
      },
    },
  } as CommandContext;
  return context;
}
