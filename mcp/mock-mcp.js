import { mcpCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/mcpCommand.js";
import { Config } from "@qwen-code/qwen-code-core/dist/src/config/config.js";
import { ToolRegistry } from "@qwen-code/qwen-code-core/dist/src/tools/tool-registry.js";
export async function mockmcp(sessionId, sessionManager, args = "") {
  const session = sessionManager.sessions.get(sessionId);
  if (!session) {
    throw new Error("Session not found");
  }
  const result = {};
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
        result.itemData = itemData;
        result.baseTimestamp = baseTimestamp;
        return 0;
      },
    },
  };
  if (typeof mcpCommand.action === "function") {
    const result2 = await mcpCommand.action(context, args);
    return result2;
  } else {
    throw new Error("mcpCommand.action is not a function");
  }
}
export async function mockmcpList(sessionId, sessionManager, args = "") {
  const session = sessionManager.sessions.get(sessionId);
  if (!session) {
    throw new Error("Session not found");
  }
  const result = {};
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
        result.itemData = itemData;
        result.baseTimestamp = baseTimestamp;
        return 0;
      },
    },
  };
  const listCommand = mcpCommand.subCommands?.find((command) =>
    command.name === "list"
  );
  if (typeof listCommand?.action === "function") {
    return (await listCommand.action(context, args));
  } else {
    throw new Error("listCommand.action is not a function");
  }
}
export function createcontext(config, addItem) {
  const context = {
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
        async getToolRegistry() {
          return Promise.resolve(config.getToolRegistry());
        },
        getMcpServers() {
          return config.getMcpServers();
        },
      },
    },
    ui: {
      addItem(itemData, baseTimestamp) {
        return addItem(itemData, baseTimestamp);
      },
    },
  };
  return context;
}
//# sourceMappingURL=mock-mcp.js.map
