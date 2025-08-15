import { mcpCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/mcpCommand.js";
export async function mockmcp() {
  const context = {
    services: {
      settings: {
        merged: {
          selectedAuthType: "openai",
        },
      },
      config: {
        getPromptRegistry() {},
        getBlockedMcpServers() {},
        getToolRegistry() {},
        getMcpServers() {},
      },
    },
    ui: {},
  };
  if (typeof mcpCommand.action === "function") {
    return (await mcpCommand.action(context, ""));
  } else {
    throw new Error("mcpCommand.action is not a function");
  }
}
export async function mockmcpList() {
  const context = {
    services: {
      settings: {
        merged: {
          selectedAuthType: "openai",
        },
      },
      config: {
        getPromptRegistry() {},
        getBlockedMcpServers() {},
        getToolRegistry() {},
        getMcpServers() {},
      },
    },
    ui: {},
  };
  const listCommand = mcpCommand.subCommands?.find((command) =>
    command.name === "list"
  );
  if (typeof listCommand?.action === "function") {
    return (await listCommand.action(context, ""));
  } else {
    throw new Error("listCommand.action is not a function");
  }
}
export async function mockmcpRefresh() {
  const context = {
    services: {
      settings: {
        merged: {
          selectedAuthType: "openai",
        },
      },
      config: {
        getPromptRegistry() {},
        getBlockedMcpServers() {},
        getToolRegistry() {},
        getMcpServers() {},
      },
    },
    ui: {},
  };
  const refreshCommand = mcpCommand.subCommands?.find((command) =>
    command.name === "refresh"
  );
  if (typeof refreshCommand?.action === "function") {
    return (await refreshCommand.action(context, ""));
  } else {
    throw new Error("refreshCommand.action is not a function");
  }
}
export async function mockmcpAuth() {
  const context = {
    services: {
      settings: {
        merged: {
          selectedAuthType: "openai",
        },
      },
      config: {
        getPromptRegistry() {},
        getBlockedMcpServers() {},
        getToolRegistry() {},
        getMcpServers() {},
      },
    },
    ui: {},
  };
  const authCommand = mcpCommand.subCommands?.find((command) =>
    command.name === "auth"
  );
  if (typeof authCommand?.action === "function") {
    return (await authCommand.action(context, ""));
  } else {
    throw new Error("authCommand.action is not a function");
  }
}
//# sourceMappingURL=mock-mcp.js.map
