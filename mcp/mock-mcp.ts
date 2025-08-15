import { mcpCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/mcpCommand.js";
import type { CommandContext } from "@qwen-code/qwen-code/dist/src/ui/commands/types.js";

import { Config } from "@qwen-code/qwen-code-core/dist/src/config/config.js";
import { ToolRegistry } from "@qwen-code/qwen-code-core/dist/src/tools/tool-registry.js";
import { creategeminiconfig } from "./gemini.js";
import type { HistoryItem } from "@qwen-code/qwen-code/dist/src/ui/types.js";
export async function mockmcp(
  cwd: string,
  argv: string[],
  args: string = ""
): Promise<{
  type?: string;
  messageType?: string;
  content?: string;
}> {
  const result: { itemData?: Omit<HistoryItem, "id">; baseTimestamp?: number } =
    {};
  const config = (await creategeminiconfig(cwd, argv)) as Config;
  const context: CommandContext = createcontext(
    config,
    function (itemData, baseTimestamp) {
      result.itemData = itemData;
      result.baseTimestamp = baseTimestamp;
      return 0;
    }
  ) as CommandContext;
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
  cwd: string,
  argv: string[],
  args: string = ""
): Promise<{
  type?: string;
  messageType?: string;
  content?: string;
}> {
  const result: { itemData?: Omit<HistoryItem, "id">; baseTimestamp?: number } =
    {};
  const config = (await creategeminiconfig(cwd, argv)) as Config;
  const context: CommandContext = createcontext(
    config,
    function (itemData, baseTimestamp) {
      result.itemData = itemData;
      result.baseTimestamp = baseTimestamp;
      return 0;
    }
  ) as CommandContext;
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

export async function mockmcpRefresh(
  cwd: string,
  argv: string[],
  args: string = ""
): Promise<
  [
    { itemData?: Omit<HistoryItem, "id">; baseTimestamp?: number },
    {
      type?: string;
      messageType?: string;
      content?: string;
    }
  ]
> {
  const result: { itemData?: Omit<HistoryItem, "id">; baseTimestamp?: number } =
    {};
  const config = (await creategeminiconfig(cwd, argv)) as Config;
  const context: CommandContext = createcontext(
    config,
    function (itemData, baseTimestamp) {
      result.itemData = itemData;
      result.baseTimestamp = baseTimestamp;
      return 0;
    }
  ) as CommandContext;
  const refreshCommand = mcpCommand.subCommands?.find(
    (command) => command.name === "refresh"
  );
  if (typeof refreshCommand?.action === "function") {
    const result2 = (await refreshCommand.action(context, args)) as {
      type?: string;
      messageType?: string;
      content?: string;
    };
    return [result, result2];
  } else {
    throw new Error("refreshCommand.action is not a function");
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
        getGeminiClient(){
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
export async function mockmcpAuth(
  cwd: string,
  argv: string[],
  args: string = ""
): Promise<{
  type?: string;
  messageType?: string;
  content?: string;
}> {
  const result: { itemData?: Omit<HistoryItem, "id">; baseTimestamp?: number } =
    {};
  const config = (await creategeminiconfig(cwd, argv)) as Config;
  const context: CommandContext = createcontext(
    config,
    function (itemData, baseTimestamp) {
      result.itemData = itemData;
      result.baseTimestamp = baseTimestamp;
      return 0;
    }
  ) as CommandContext;
  const authCommand = mcpCommand.subCommands?.find(
    (command) => command.name === "auth"
  );
  if (typeof authCommand?.action === "function") {
    return (await authCommand.action(context, args)) as {
      type?: string;
      messageType?: string;
      content?: string;
    };
  } else {
    throw new Error("authCommand.action is not a function");
  }
}
