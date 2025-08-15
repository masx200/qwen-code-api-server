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
    "model": "qwen-coder",
    "content": "模型信息内容",
    "timestamp": 1234567890,
    "tokens": 100
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
