import { statsCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/statsCommand.js";
import type { CommandContext } from "@qwen-code/qwen-code/dist/src/ui/commands/types.js";
import type { HistoryItemStats } from "@qwen-code/qwen-code/dist/src/ui/types.js";
import type { SessionManager } from "../session/sessions.js";

export async function mockStats(
  model: string,
  sessionId: string,
  sessionManager: SessionManager,
): Promise<{ itemData?: HistoryItemStats; baseTimestamp?: number }> {
  const result: { itemData?: HistoryItemStats; baseTimestamp?: number } = {};
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
      addItem(itemData: HistoryItemStats, baseTimestamp): void {
        result.itemData = itemData as HistoryItemStats;
        result.baseTimestamp = baseTimestamp;
      },
    },
  } as CommandContext;
  if (typeof statsCommand.action === "function") {
    await statsCommand.action(context, "");
  } else {
    throw new Error("statsCommand.action is not a function");
  }
  return result;
}

export async function mockStatsModel(
  model: string,
  sessionId: string,
  sessionManager: SessionManager,
): Promise<{ itemData?: HistoryItemStats; baseTimestamp?: number }> {
  const result: { itemData?: HistoryItemStats; baseTimestamp?: number } = {};
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
      addItem(itemData: HistoryItemStats, baseTimestamp): void {
        result.itemData = itemData as HistoryItemStats;
        result.baseTimestamp = baseTimestamp;
      },
    },
  } as CommandContext;
  const modelCommand = statsCommand.subCommands?.find(
    (command) => command.name === "model",
  );
  if (typeof modelCommand?.action === "function") {
    await modelCommand.action(context, "");
  } else {
    throw new Error("modelCommand.action is not a function");
  }
  return result;
}

export async function mockStatsTools(
  model: string,
  sessionId: string,
  sessionManager: SessionManager,
): Promise<{ itemData?: HistoryItemStats; baseTimestamp?: number }> {
  const result: { itemData?: HistoryItemStats; baseTimestamp?: number } = {};
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
      addItem(itemData: HistoryItemStats, baseTimestamp): void {
        result.itemData = itemData as HistoryItemStats;
        result.baseTimestamp = baseTimestamp;
      },
    },
  } as CommandContext;
  const toolsCommand = statsCommand.subCommands?.find(
    (command) => command.name === "tools",
  );
  if (typeof toolsCommand?.action === "function") {
    await toolsCommand.action(context, "");
  } else {
    throw new Error("toolsCommand.action is not a function");
  }
  return result;
}
