import { mcpCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/mcpCommand.js";
import type { CommandContext } from "@qwen-code/qwen-code/dist/src/ui/commands/types.js";

export async function mockmcp(): Promise<
  Promise<{
    type?: string;
    messageType?: string;
    content?: string;
  }>
> {
  const context: CommandContext = {
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
  } as CommandContext;
  if (typeof mcpCommand.action === "function") {
    return (await mcpCommand.action(context, "")) as {
      type?: string;
      messageType?: string;
      content?: string;
    };
  } else {
    throw new Error("mcpCommand.action is not a function");
  }
}

export async function mockmcpList(): Promise<
  Promise<{
    type?: string;
    messageType?: string;
    content?: string;
  }>
> {
  const context: CommandContext = {
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
  } as CommandContext;
  const listCommand=mcpCommand.subCommands?.find(
    (command) => command.name === "list",
  );
  if (typeof listCommand?.action === "function") {
    return (await listCommand.action(context, "")) as {
      type?: string;
      messageType?: string;
      content?: string;
    };
  } else {
    throw new Error("listCommand.action is not a function");
  }
}

export async function mockmcpRefresh(): Promise<
  Promise<{
    type?: string;
    messageType?: string;
    content?: string;
  }>
> {
  const context: CommandContext = {
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
  } as CommandContext;
  const refreshCommand = mcpCommand.subCommands?.find(
    (command) => command.name === "refresh",
  );
  if (typeof refreshCommand?.action === "function") {
    return (await refreshCommand.action(context, "")) as {
      type?: string;
      messageType?: string;
      content?: string;
    };
  } else {
    throw new Error("refreshCommand.action is not a function");
  }
}

export async function mockmcpAuth(): Promise<
  Promise<{
    type?: string;
    messageType?: string;
    content?: string;
  }>
> {
  const context: CommandContext = {
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
  } as CommandContext;
  const authCommand = mcpCommand.subCommands?.find(
    (command) => command.name === "auth",
  );
  if (typeof authCommand?.action === "function") {
    return (await authCommand.action(context, "")) as {
      type?: string;
      messageType?: string;
      content?: string;
    };
  } else {
    throw new Error("authCommand.action is not a function");
  }
}
