# Qwen Code API Server

一个基于 Fastify 的 REST API 服务器，提供 Qwen Code 相关的命令接口服务。

## 功能特性

- 🚀 基于 Fastify 的高性能 REST API
- 📚 内置 Swagger/OpenAPI 文档支持
- 🎯 提供 `/command/about` 接口用于获取模型信息
- 🔧 TypeScript 编写，提供完整的类型支持

## 项目结构

```
qwen-code-api-server/
├── index.ts          # 主服务器入口文件
├── mock-about.ts     # about命令模拟实现
├── package.json      # 项目配置
├── tsconfig.json     # TypeScript配置
└── vitest.config.ts  # 测试配置
```

## 快速开始

### 安装依赖

```bash
# 使用 yarn
yarn install

# 或使用 npm
npm install
```

### 启动服务

```bash
# 开发模式
yarn dev

# 生产模式
yarn start

# 或使用 npm
npm run dev
npm start
```

### 测试

```bash
# 运行测试
yarn test

# 或
npm test
```

## API 文档

### 基础信息

- **服务地址**: `http://localhost:3000`
- **文档地址**: `http://localhost:3000/documentation`

### 接口详情

#### POST /command/about

获取指定模型的 about 信息。

**请求格式**:

```json
{
  "model": "qwen-coder"
}
```

**响应格式**:

```json
{
  "itemData": {
    "type": "about",
    "cliVersion": "0.0.6",
    "osVersion": "macos",
    "modelVersion": "qwen-coder",
    "selectedAuthType": "openai",
    "gcpProject": ""
  },
  "baseTimestamp": 1234567890
}
```

**错误响应**:

```json
{
  "error": "Internal server error",
  "message": "test error"
}
```

### MCP 工具函数

#### mockmcpList 函数

用于获取配置的 MCP (Model Context Protocol) 服务器列表信息。

**函数签名**:

```typescript
async function mockmcpList(
  cwd: string,
  argv: string[],
  args: string = "",
): Promise<{
  type?: string;
  messageType?: string;
  content?: string;
}> {}
```

**参数说明**:

- `cwd`: 当前工作目录路径
- `argv`: 命令行参数数组
- `args`: 额外参数，可选值包括：
  - `""` (默认): 显示基础服务器列表
  - `"desc"`: 显示服务器详细描述信息
  - `"schema"`: 显示服务器架构信息

**使用示例**:

```typescript
import { mockmcpList } from "./mcp/mock-mcp.js";
import * as os from "os";

// 获取 MCP 服务器列表
const result = await mockmcpList(os.homedir(), [], "");
console.log(result.content);

// 获取详细描述信息
const descResult = await mockmcpList(os.homedir(), [], "desc");
console.log(descResult.content);

// 获取服务器架构信息
const schemaResult = await mockmcpList(os.homedir(), [], "schema");
console.log(schemaResult.content);
```

**响应格式**: 当配置有 MCP 服务器时:

```
Configured MCP servers:
- server-name-1: description
- server-name-2: description
```

当没有配置 MCP 服务器时:

```
No MCP servers configured.
```

**注意事项**:

- 该函数会读取用户的配置文件中的 `mcpServers` 设置
- 返回的内容格式为纯文本字符串，包含在 `content` 字段中
- 函数会自动处理配置文件不存在或配置为空的情况

## 开发指南

### 环境要求

- Node.js >= 16
- TypeScript >= 5.0

### 开发命令

```bash
# 编译 TypeScript
yarn build

# 开发模式（带热重载）
yarn dev

# 运行测试
yarn test

# 代码格式化
yarn format

# 代码检查
yarn lint
```

### 添加新接口

1. 在 `index.ts` 中添加新的路由处理
2. 使用 Fastify 的 schema 验证定义请求和响应格式
3. 更新 Swagger 文档
4. 添加相应的测试用例

## 配置说明

### 端口配置

默认服务运行在 `3000` 端口，可以通过环境变量修改：

```bash
yarn start
```

### 日志配置

Fastify 内置了日志功能，可以在 `index.ts` 中配置日志级别：

```typescript
const fastify = Fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
    },
  },
});
```
