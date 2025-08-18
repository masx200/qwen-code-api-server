import type { HistoryItemModelStats, HistoryItemStats, HistoryItemToolStats } from "@qwen-code/qwen-code/dist/src/ui/types.js";
import type { SessionManager } from "../session/SessionManager.js";
export declare function mockStats(sessionId: string, sessionManager: SessionManager): Promise<{
    itemData?: HistoryItemStats;
    baseTimestamp?: number;
}>;
export declare function mockStatsModel(sessionId: string, sessionManager: SessionManager): Promise<{
    itemData?: HistoryItemModelStats;
    baseTimestamp?: number;
}>;
export declare function mockStatsTools(sessionId: string, sessionManager: SessionManager): Promise<{
    itemData?: HistoryItemToolStats;
    baseTimestamp?: number;
}>;
//# sourceMappingURL=mock-stats.d.ts.map