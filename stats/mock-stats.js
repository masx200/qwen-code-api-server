import { statsCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/statsCommand.js";
export async function mockStats(sessionId, sessionManager) {
  const session = sessionManager.getSession(sessionId);
  if (!session) {
    throw new Error(`Session ${sessionId} not found`);
  }
  const result = {};
  const context = {
    session: {
      stats: session.session.stats,
      sessionShellAllowlist: session.session.sessionShellAllowlist,
    },
    services: session.services,
    ui: {
      addItem(itemData, baseTimestamp) {
        result.itemData = itemData;
        result.baseTimestamp = baseTimestamp;
      },
    },
  };
  if (typeof statsCommand.action === "function") {
    await statsCommand.action(context, "");
  } else {
    throw new Error("statsCommand.action is not a function");
  }
  return result;
}
export async function mockStatsModel(sessionId, sessionManager) {
  const session = sessionManager.getSession(sessionId);
  if (!session) {
    throw new Error(`Session ${sessionId} not found`);
  }
  const result = {};
  const context = {
    session: {
      stats: session.session.stats,
      sessionShellAllowlist: session.session.sessionShellAllowlist,
    },
    services: session.services,
    ui: {
      addItem(itemData, baseTimestamp) {
        result.itemData = itemData;
        result.baseTimestamp = baseTimestamp;
      },
    },
  };
  const modelCommand = statsCommand.subCommands?.find((command) =>
    command.name === "model"
  );
  if (typeof modelCommand?.action === "function") {
    await modelCommand.action(context, "");
  } else {
    throw new Error("modelCommand.action is not a function");
  }
  return result;
}
export async function mockStatsTools(sessionId, sessionManager) {
  const session = sessionManager.getSession(sessionId);
  if (!session) {
    throw new Error(`Session ${sessionId} not found`);
  }
  const result = {};
  const context = {
    session: {
      stats: session.session.stats,
      sessionShellAllowlist: session.session.sessionShellAllowlist,
    },
    services: session.services,
    ui: {
      addItem(itemData, baseTimestamp) {
        result.itemData = itemData;
        result.baseTimestamp = baseTimestamp;
      },
    },
  };
  const toolsCommand = statsCommand.subCommands?.find((command) =>
    command.name === "tools"
  );
  if (typeof toolsCommand?.action === "function") {
    await toolsCommand.action(context, "");
  } else {
    throw new Error("toolsCommand.action is not a function");
  }
  return result;
}
//# sourceMappingURL=mock-stats.js.map
