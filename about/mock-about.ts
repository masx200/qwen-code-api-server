import { aboutCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/aboutCommand.js";
import type { CommandContext } from "@qwen-code/qwen-code/dist/src/ui/commands/types.js";
import type { HistoryItemAbout } from "@qwen-code/qwen-code/dist/src/ui/types.js";
export async function mockAbout(
  model: string
): Promise<{ itemData?: HistoryItemAbout; baseTimestamp?: number }> {
  const result: { itemData?: HistoryItemAbout; baseTimestamp?: number } = {};
  const context: CommandContext = {
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
      addItem(itemData: HistoryItemAbout, baseTimestamp): number {
        result.itemData = itemData as HistoryItemAbout;
        result.baseTimestamp = baseTimestamp;
        return 0;
      },
    },
  } as CommandContext;
  if (typeof aboutCommand.action === "function") {
    await aboutCommand.action(context, "");
  } else {
    throw new Error("aboutCommand.action is not a function");
  }
  return result;
}
