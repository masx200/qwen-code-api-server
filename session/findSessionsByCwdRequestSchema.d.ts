export declare const findSessionsByCwdRequestSchema: {
  type: string;
  properties: {
    cwd: {
      type: string;
      description: string;
    };
  };
  required: string[];
};
export declare const findSessionsByCwdResponseSchema: {
  type: string;
  properties: {
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
    sessions: {
      type: string;
      items: {
        type: string;
      };
      description: string;
    };
  };
};
//# sourceMappingURL=findSessionsByCwdRequestSchema.d.ts.map
