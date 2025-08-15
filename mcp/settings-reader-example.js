import { readSettings, readSettingsSync } from "./settings-reader.js";
// 使用示例
async function example() {
  try {
    // 异步读取设置
    const settings = await readSettings();
    console.log("异步读取的设置:", settings);
    // 同步读取设置
    const settingsSync = readSettingsSync();
    console.log("同步读取的设置:", settingsSync);
    // 访问特定设置
    if (settings.theme) {
      console.log("当前主题:", settings.theme);
    }
    if (settings.apiKey) {
      console.log("API密钥已配置");
    }
  } catch (error) {
    console.error("读取设置时出错:", error);
  }
}
// 运行示例
if (import.meta.url === `file://${process.argv[1]}`) {
  example();
}
//# sourceMappingURL=settings-reader-example.js.map
