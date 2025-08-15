import { mcpCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/mcpCommand.js";
import { Config } from "@qwen-code/qwen-code-core/dist/src/config/config.js";
import { ToolRegistry } from "@qwen-code/qwen-code-core/dist/src/tools/tool-registry.js";
import { creategeminiconfig } from "./gemini.js";
export async function mockmcp(cwd, argv, args = "") {
  const result = {};
  const config = await creategeminiconfig(cwd, argv);
  const context = createcontext(config, function (itemData, baseTimestamp) {
    result.itemData = itemData;
    result.baseTimestamp = baseTimestamp;
    return 0;
  });
  if (typeof mcpCommand.action === "function") {
    const result2 = await mcpCommand.action(context, args);
    return result2;
  } else {
    throw new Error("mcpCommand.action is not a function");
  }
}
export async function mockmcpList(cwd, argv, args = "") {
  const result = {};
  const config = await creategeminiconfig(cwd, argv);
  const context = createcontext(config, function (itemData, baseTimestamp) {
    result.itemData = itemData;
    result.baseTimestamp = baseTimestamp;
    return 0;
  });
  const listCommand = mcpCommand.subCommands?.find((command) =>
    command.name === "list"
  );
  if (typeof listCommand?.action === "function") {
    return (await listCommand.action(context, args));
  } else {
    throw new Error("listCommand.action is not a function");
  }
}
export async function mockmcpRefresh(cwd, argv, args = "") {
  const result = {};
  const config = await creategeminiconfig(cwd, argv);
  const context = createcontext(config, function (itemData, baseTimestamp) {
    result.itemData = itemData;
    result.baseTimestamp = baseTimestamp;
    return 0;
  });
  const refreshCommand = mcpCommand.subCommands?.find((command) =>
    command.name === "refresh"
  );
  if (typeof refreshCommand?.action === "function") {
    const result2 = await refreshCommand.action(context, args);
    return [result, result2];
  } else {
    throw new Error("refreshCommand.action is not a function");
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
export async function mockmcpAuth(cwd, argv, args = "") {
  const result = {};
  const config = await creategeminiconfig(cwd, argv);
  const context = createcontext(config, function (itemData, baseTimestamp) {
    result.itemData = itemData;
    result.baseTimestamp = baseTimestamp;
    return 0;
  });
  const authCommand = mcpCommand.subCommands?.find((command) =>
    command.name === "auth"
  );
  if (typeof authCommand?.action === "function") {
    return (await authCommand.action(context, args));
  } else {
    throw new Error("authCommand.action is not a function");
  }
}
//# sourceMappingURL=mock-mcp.js.map
