export declare const modelMetricsSchema: {
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
//# sourceMappingURL=model-schema.d.ts.map
