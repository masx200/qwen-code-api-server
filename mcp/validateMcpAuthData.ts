import { z } from "zod";

// 定义类型验证schema
const mcpAuthDataSchema = z.object({
  cwd: z.string(),
  argv: z.array(z.string()),
  args: z.string(),
  id: z.string(),
});

// 导出类型定义
export type McpAuthData = z.infer<typeof mcpAuthDataSchema>;

/**
 * 使用zod验证MCP认证数据的函数
 * @param data 需要验证的数据
 * @returns 验证成功返回解析后的数据，失败抛出错误
 */
export function validateMcpAuthData(data: unknown): McpAuthData {
  try {
    // 使用zod进行验证和解析
    const result = mcpAuthDataSchema.parse(data);
    return result;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`验证失败: ${error}`);
    }
    throw new Error(`验证失败: ${error}`);
  }
}
