import type { HistoryItemStats } from "@qwen-code/qwen-code/dist/src/ui/types.js";
import type { SessionManager } from "./sessions.js";
export declare function mockStats(
  model: string,
  sessionId: string,
  sessionManager: SessionManager,
): Promise<{
  itemData?: HistoryItemStats;
  baseTimestamp?: number;
}>;
export declare function mockStatsModel(
  model: string,
  sessionId: string,
  sessionManager: SessionManager,
): Promise<{
  itemData?: HistoryItemStats;
  baseTimestamp?: number;
}>;
export declare function mockStatsTools(
  model: string,
  sessionId: string,
  sessionManager: SessionManager,
): Promise<{
  itemData?: HistoryItemStats;
  baseTimestamp?: number;
}>;
//# sourceMappingURL=mock-stats.d.ts.map
