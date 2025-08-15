export const modelMetricsSchema = {
    "type": "object",
    "patternProperties": {
        "^.*$": {
            "type": "object",
            "title": "ModelMetrics",
            "properties": {
                "api": {
                    "type": "object",
                    "properties": {
                        "totalRequests": {
                            "type": "number",
                            "minimum": 0,
                            "description": "总API请求次数"
                        },
                        "totalErrors": {
                            "type": "number",
                            "minimum": 0,
                            "description": "总API错误次数"
                        },
                        "totalLatencyMs": {
                            "type": "number",
                            "minimum": 0,
                            "description": "总延迟时间（毫秒）"
                        }
                    },
                    "required": ["totalRequests", "totalErrors", "totalLatencyMs"],
                    "additionalProperties": false
                },
                "tokens": {
                    "type": "object",
                    "properties": {
                        "prompt": {
                            "type": "number",
                            "minimum": 0,
                            "description": "提示词token数量"
                        },
                        "candidates": {
                            "type": "number",
                            "minimum": 0,
                            "description": "候选响应token数量"
                        },
                        "total": {
                            "type": "number",
                            "minimum": 0,
                            "description": "总token数量"
                        },
                        "cached": {
                            "type": "number",
                            "minimum": 0,
                            "description": "缓存token数量"
                        },
                        "thoughts": {
                            "type": "number",
                            "minimum": 0,
                            "description": "思考过程token数量"
                        },
                        "tool": {
                            "type": "number",
                            "minimum": 0,
                            "description": "工具调用token数量"
                        }
                    },
                    "required": ["prompt", "candidates", "total", "cached", "thoughts", "tool"],
                    "additionalProperties": false
                }
            },
            "required": ["api", "tokens"],
            "additionalProperties": false
        }
    },
    "additionalProperties": false
};
//# sourceMappingURL=model-schema.js.map