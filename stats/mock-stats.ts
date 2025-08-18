import { statsCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/statsCommand.js";
import type { CommandContext } from "@qwen-code/qwen-code/dist/src/ui/commands/types.js";
import type {
  HistoryItemModelStats,
  HistoryItemStats,
  HistoryItemToolStats,
} from "@qwen-code/qwen-code/dist/src/ui/types.js";
import type { SessionManager } from "../session/SessionManager.js";

export async function mockStats(
  sessionId: string,
  sessionManager: SessionManager,
): Promise<{ itemData?: HistoryItemStats; baseTimestamp?: number }> {
  const session = sessionManager.getSession(sessionId);
  if (!session) {
    throw new Error(`Session ${sessionId} not found`);
  }
  const result: { itemData?: HistoryItemStats; baseTimestamp?: number } = {};
  const context: CommandContext = {
    session: {
      stats: session.session.stats,
      sessionShellAllowlist: session.session.sessionShellAllowlist,
    },
    services: session.services,
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
  sessionId: string,
  sessionManager: SessionManager,
): Promise<{ itemData?: HistoryItemModelStats; baseTimestamp?: number }> {
  const session = sessionManager.getSession(sessionId);
  if (!session) {
    throw new Error(`Session ${sessionId} not found`);
  }
  const result: { itemData?: HistoryItemModelStats; baseTimestamp?: number } =
    {};
  const context: CommandContext = {
    session: {
      stats: session.session.stats,
      sessionShellAllowlist: session.session.sessionShellAllowlist,
    },
    services: session.services,
    ui: {
      addItem(itemData: HistoryItemModelStats, baseTimestamp): void {
        result.itemData = itemData as HistoryItemModelStats;
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
  sessionId: string,
  sessionManager: SessionManager,
): Promise<{ itemData?: HistoryItemToolStats; baseTimestamp?: number }> {
  const session = sessionManager.getSession(sessionId);
  if (!session) {
    throw new Error(`Session ${sessionId} not found`);
  }
  const result: { itemData?: HistoryItemToolStats; baseTimestamp?: number } =
    {};
  const context: CommandContext = {
    session: {
      stats: session.session.stats,
      sessionShellAllowlist: session.session.sessionShellAllowlist,
    },
    services: session.services,
    ui: {
      addItem(itemData: HistoryItemToolStats, baseTimestamp): void {
        result.itemData = itemData as HistoryItemToolStats;
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
