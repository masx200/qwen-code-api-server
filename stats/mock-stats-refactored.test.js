import { beforeEach, describe, expect, it } from "vitest";
import { SessionManager } from "../session/sessions.js";
import { mockStats, mockStatsModel, mockStatsTools } from "./mock-stats.js";
// 创建不依赖statsCommand的测试版本
describe("MockStats Functions - Refactored Tests (No statsCommand)", () => {
  let mockSessionManager;
  const mockSessionId = "test-session-123";
  beforeEach(() => {
    // 创建模拟的SessionManager
    mockSessionManager = new SessionManager();
    // 添加测试数据
    mockSessionManager.sessions.set(
      mockSessionId,
      mockSessionManager.createSession(),
    );
    mockSessionManager.sessionShellAllowlist.set(
      mockSessionId,
      new Set(["bash", "node", "python"]),
    );
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
