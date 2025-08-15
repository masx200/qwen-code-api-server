export declare const quitRequestSchema: {
    type: string;
    properties: {
        sessionId: {
            type: string;
            description: string;
        };
    };
    required: string[];
    additionalProperties: boolean;
};
export declare const quitResponseSchema: {
    type: string;
    properties: {
        duration: {
            type: string;
            description: string;
        };
        success: {
            type: string;
            description: string;
        };
        error: {
            type: string;
            description: string;
        };
        message: {
            type: string;
            description: string;
        };
        type: {
            type: string;
            description: string;
        };
        messages: {
            type: string;
            description: string;
            items: {
                type: string;
                properties: {
                    type: {
                        type: string;
                        description: string;
                    };
                    text: {
                        type: string[];
                        description: string;
                    };
                    id: {
                        type: string;
                        description: string;
                    };
                    duration: {
                        type: string[];
                        description: string;
                    };
                };
                required: string[];
                additionalProperties: boolean;
            };
        };
        sessionId: {
            type: string;
            description: string;
        };
        sessionStats: {
            type: string;
            description: string;
            properties: {
                sessionStartTime: {
                    type: string;
                    format: string;
                    description: string;
                };
                promptCount: {
                    type: string;
                    description: string;
                };
                lastPromptTokenCount: {
                    type: string;
                    description: string;
                };
                metrics: {
                    type: string;
                    description: string;
                    properties: {
                        models: {
                            type: string;
                            patternProperties: {
                                "^.*$": {
                                    type: string;
                                    title: string;
                                    properties: {
                                        api: {
                                            type: string;
                                            properties: {
                                                totalRequests: {
                                                    type: string;
                                                    minimum: number;
                                                    description: string;
                                                };
                                                totalErrors: {
                                                    type: string;
                                                    minimum: number;
                                                    description: string;
                                                };
                                                totalLatencyMs: {
                                                    type: string;
                                                    minimum: number;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                            additionalProperties: boolean;
                                        };
                                        tokens: {
                                            type: string;
                                            properties: {
                                                prompt: {
                                                    type: string;
                                                    minimum: number;
                                                    description: string;
                                                };
                                                candidates: {
                                                    type: string;
                                                    minimum: number;
                                                    description: string;
                                                };
                                                total: {
                                                    type: string;
                                                    minimum: number;
                                                    description: string;
                                                };
                                                cached: {
                                                    type: string;
                                                    minimum: number;
                                                    description: string;
                                                };
                                                thoughts: {
                                                    type: string;
                                                    minimum: number;
                                                    description: string;
                                                };
                                                tool: {
                                                    type: string;
                                                    minimum: number;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                            additionalProperties: boolean;
                                        };
                                    };
                                    required: string[];
                                    additionalProperties: boolean;
                                };
                            };
                            additionalProperties: boolean;
                        };
                        tools: {
                            type: string;
                            description: string;
                            properties: {
                                totalCalls: {
                                    type: string;
                                    description: string;
                                };
                                totalSuccess: {
                                    type: string;
                                    description: string;
                                };
                                totalFail: {
                                    type: string;
                                    description: string;
                                };
                                totalDurationMs: {
                                    type: string;
                                    description: string;
                                };
                                totalDecisions: {
                                    type: string;
                                    description: string;
                                    properties: {
                                        accept: {
                                            type: string;
                                            description: string;
                                        };
                                        reject: {
                                            type: string;
                                            description: string;
                                        };
                                        modify: {
                                            type: string;
                                            description: string;
                                        };
                                    };
                                };
                                byName: {
                                    type: string;
                                    description: string;
                                    properties: {};
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
//# sourceMappingURL=route-quit.d.ts.map