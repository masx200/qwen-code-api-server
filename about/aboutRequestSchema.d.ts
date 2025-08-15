export declare const aboutRequestSchema: {
    type: string;
    properties: {
        model: {
            type: string;
            description: string;
        };
    };
    required: string[];
};
export declare const aboutResponseSchema: {
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
        itemData: {
            type: string;
            description: string;
            properties: {
                type: {
                    type: string;
                };
                cliVersion: {
                    type: string;
                };
                osVersion: {
                    type: string;
                };
                modelVersion: {
                    type: string;
                };
                selectedAuthType: {
                    type: string;
                };
                gcpProject: {
                    type: string;
                };
            };
        };
        baseTimestamp: {
            type: string;
            description: string;
        };
    };
};
//# sourceMappingURL=aboutRequestSchema.d.ts.map