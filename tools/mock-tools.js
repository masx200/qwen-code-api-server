import { toolsCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/toolsCommand.js";
import { Config } from "@qwen-code/qwen-code-core/dist/src/config/config.js";
import { ToolRegistry } from "@qwen-code/qwen-code-core/dist/src/tools/tool-registry.js";
import { creategeminiconfig } from "../mcp/gemini.js";
export async function mocktools(cwd, argv, args = "") {
  const result = {};
  const config = await creategeminiconfig(cwd, argv);
  const context = createcontext(config, function (itemData, baseTimestamp) {
    result.itemData = itemData;
    result.baseTimestamp = baseTimestamp;
    return 0;
  });
  if (typeof toolsCommand.action === "function") {
    await toolsCommand.action(context, args);
    return result;
  } else {
    throw new Error("toolsCommand.action is not a function");
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
//# sourceMappingURL=mock-tools.js.map
