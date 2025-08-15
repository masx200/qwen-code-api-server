import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { readSettings, readSettingsSync } from "./settings-reader.js";
// 模拟依赖模块
vi.mock("fs/promises");
vi.mock("os");
vi.mock("path");
const mockHomedir = "/home/testuser";
const mockSettingsPath = "/home/testuser/.qwen/settings.json";
describe("readSettings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // 设置模拟值
    vi.mocked(os.homedir).mockReturnValue(mockHomedir);
    vi.mocked(path.join).mockImplementation((...args) => {
      return args.join("/").replace(/\/+/g, "/");
    });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  describe("异步版本 readSettings", () => {
    it("应该正确读取并解析存在的设置文件", async () => {
      const mockSettings = {
        theme: "dark",
        language: "zh-CN",
        apiKey: "test-key",
      };
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockSettings));
      const result = await readSettings();
      expect(result).toEqual(mockSettings);
      expect(fs.readFile).toHaveBeenCalledWith(mockSettingsPath, "utf-8");
    });
    it("当文件不存在时应该返回空对象", async () => {
      vi.mocked(fs.access).mockRejectedValue(new Error("ENOENT"));
      const result = await readSettings();
      expect(result).toEqual({});
    });
    it("当文件内容不是有效的JSON时应该返回空对象", async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue("invalid json");
      const result = await readSettings();
      expect(result).toEqual({});
    });
    it("当文件内容是数组而不是对象时应该返回空对象", async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue("[1, 2, 3]");
      const result = await readSettings();
      expect(result).toEqual({});
    });
    it("当文件内容是null时应该返回空对象", async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue("null");
      const result = await readSettings();
      expect(result).toEqual({});
    });
  });
  describe("同步版本 readSettingsSync", () => {
    beforeEach(() => {
      // 重置 require 缓存以重新加载模块
      vi.resetModules();
    });
    it("应该正确读取并解析存在的设置文件", async () => {
      // 动态导入模块以应用新的 mock
      const { readSettingsSync } = await import("./settings-reader.js");
      const mockSettings = {
        theme: "light",
        language: "en-US",
      };
      // 模拟 fs 模块
      const mockFs = {
        existsSync: vi.fn().mockReturnValue(true),
        readFileSync: vi.fn().mockReturnValue(JSON.stringify(mockSettings)),
      };
      vi.doMock("fs", () => mockFs);
      const result = readSettingsSync();
      expect(result).toEqual(mockSettings);
    });
    it("当文件不存在时应该返回空对象", async () => {
      const { readSettingsSync } = await import("./settings-reader.js");
      const mockFs = {
        existsSync: vi.fn().mockReturnValue(false),
        readFileSync: vi.fn(),
      };
      vi.doMock("fs", () => mockFs);
      const result = readSettingsSync();
      expect(result).toEqual({});
      expect(mockFs.readFileSync).not.toHaveBeenCalled();
    });
  });
});
//# sourceMappingURL=settings-reader.test.js.map
