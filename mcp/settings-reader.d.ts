/**
 * 读取并解析用户主目录下的 .qwen/settings.json 文件
 * @returns 解析后的对象，如果文件不存在或解析失败则返回空对象
 */
export declare function readSettings(): Promise<Record<string, any>>;
/**
 * 同步版本：读取并解析用户主目录下的 .qwen/settings.json 文件
 * @returns 解析后的对象，如果文件不存在或解析失败则返回空对象
 */
export declare function readSettingsSync(): Record<string, unknown>;
//# sourceMappingURL=settings-reader.d.ts.map