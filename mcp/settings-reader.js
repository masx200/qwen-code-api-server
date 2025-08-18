import fs from "fs/promises";
import path from "path";
import os from "os";
export async function readSettings() {
    try {
        const settingsPath = path.join(os.homedir(), ".qwen", "settings.json");
        try {
            await fs.access(settingsPath);
        }
        catch (error) {
            throw error;
        }
        const fileContent = await fs.readFile(settingsPath, "utf-8");
        const parsed = JSON.parse(fileContent);
        if (typeof parsed === "object" && parsed !== null) {
            return parsed;
        }
        throw new Error("Invalid JSON");
    }
    catch (error) {
        console.error("读取设置文件失败:", error);
        throw error;
    }
}
export function readSettingsSync() {
    try {
        const settingsPath = path.join(os.homedir(), ".qwen", "settings.json");
        if (!require("fs").existsSync(settingsPath)) {
            return {};
        }
        const fileContent = require("fs").readFileSync(settingsPath, "utf-8");
        const parsed = JSON.parse(fileContent);
        if (typeof parsed === "object" && parsed !== null) {
            return parsed;
        }
        return {};
    }
    catch (error) {
        console.error("读取设置文件失败:", error);
        return {};
    }
}
//# sourceMappingURL=settings-reader.js.map