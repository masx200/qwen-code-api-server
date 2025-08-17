# HTTP 基本身份验证中间件

这个中间件为 Fastify 服务器提供 HTTP 基本身份验证功能。

## 使用方法

### 命令行参数

启动服务器时可以通过以下命令行参数设置用户名和密码：

```bash
# 使用默认用户名和密码 (admin/password)
node index.js

# 自定义用户名和密码
node index.js  --username myuser --password mypass

# 或者使用简写
node index.js  -u myuser -p mypass
```

### 参数说明

- `--username` 或 `-u`: 设置用户名 (默认值: admin)
- `--password` 或 `-p`: 设置密码 (默认值: password)
- `--help`: 显示帮助信息

### 访问 API

所有 API 端点现在都需要基本身份验证。可以使用以下方式访问：

#### 使用 curl

```bash
curl -u username:password http://localhost:3000/about
```

#### 使用浏览器

首次访问时浏览器会弹出登录框，输入正确的用户名和密码即可。

#### 使用 Postman

在 Authorization 选项卡中选择 Basic Auth，输入用户名和密码。

## 示例

```bash
# 启动服务器，设置自定义凭据
node index.js -- --username admin --password secret123

# 使用curl测试
curl -u admin:secret123 http://localhost:3000/about
```

## 开发说明

中间件位于 `auth/basicAuthMiddleware.ts` 文件中，主要功能：

1. 使用 yargs 解析命令行参数
2. 实现 HTTP 基本身份验证逻辑
3. 将验证通过的用户信息附加到请求对象
4. 提供友好的错误响应

验证失败时会返回 401 状态码，并包含适当的 WWW-Authenticate 头。
