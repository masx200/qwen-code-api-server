import { beforeEach, describe, expect, it } from "vitest";
import { SessionManager } from "../session/sessions.js";
import { mockStats, mockStatsModel, mockStatsTools } from "./mock-stats.js";
import os from "node:os";
describe("MockStats Functions - Refactored Tests (No statsCommand)", async () => {
    let mockSessionManager;
    const mockSessionId = "test-session-123";
    beforeEach(async () => {
        mockSessionManager = new SessionManager();
        const cwd = os.homedir();
        const argv = [];
        mockSessionManager.sessions.set(mockSessionId, await mockSessionManager.createSession(cwd, argv));
    });
    describe("createMockStats (mockStats equivalent)", () => {
        it("should return correct structure with default mock data", async () => {
            const result = await mockStats(mockSessionId, mockSessionManager);
            console.log(result);
            expect(result).toHaveProperty("itemData");
            expect(result).toHaveProperty("baseTimestamp");
            expect(result.itemData).toMatchObject({
                type: "stats",
            });
            expect(result?.itemData?.duration).toBeTypeOf("string");
        });
    });
    describe("createMockStatsModel (mockStatsModel equivalent)", () => {
        it("should return model-specific stats", async () => {
            const result = await mockStatsModel(mockSessionId, mockSessionManager);
            console.log(result);
            expect(result.itemData).toMatchObject({
                type: "model_stats",
            });
        });
        it("should handle custom action for model stats", async () => {
            const modelStatsData = {
                type: "model_stats",
            };
            const result = await mockStatsModel(mockSessionId, mockSessionManager);
            console.log(result);
            expect(result.itemData).toEqual(modelStatsData);
            expect(result.baseTimestamp).toBeTypeOf("number");
        });
    });
    describe("createMockStatsTools (mockStatsTools equivalent)", () => {
        it("should return tools-specific stats", async () => {
            const result = await mockStatsTools(mockSessionId, mockSessionManager);
            console.log(result);
            expect(result.itemData).toMatchObject({
                type: "tool_stats",
            });
        });
    });
});
//# sourceMappingURL=mock-stats-refactored.test.js.map