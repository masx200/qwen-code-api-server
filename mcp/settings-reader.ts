import fs from "fs/promises";
import path from "path";
import os from "os";

/**
 * 读取并解析用户主目录下的 .qwen/settings.json 文件
 * @returns 解析后的对象，如果文件不存在或解析失败则返回空对象
 */
export async function readSettings(
  projectPath?: string
): Promise<Record<string, any> & { mcpServers: Record<string, any> }> {
  try {
    const settingsPath = projectPath
      ? path.join(projectPath, ".qwen", "settings.json")
      : path.join(os.homedir(), ".qwen", "settings.json");

    // 检查文件是否存在
    try {
      await fs.access(settingsPath);
    } catch (error) {
      // 文件不存在，返回空对象
      throw error;
    }

    // 读取文件内容
    const fileContent = await fs.readFile(settingsPath, "utf-8");

    // 解析 JSON
    const parsed = JSON.parse(fileContent);

    // 确保返回的是对象
    if (typeof parsed === "object" && parsed !== null) {
      return { mcpServers: {}, ...parsed } as Record<string, any> & {
        mcpServers: Record<string, any>;
      };
    }

    throw new Error("Invalid JSON");
  } catch (error) {
    // 处理解析错误或其他错误
    console.error("读取设置文件失败:", error);
    throw error;
  }
}
