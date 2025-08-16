import { z } from "zod";
export declare const statsResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    error: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodString;
    itemData: z.ZodOptional<z.ZodAny>;
    baseTimestamp: z.ZodOptional<z.ZodNumber>;
    sessionStats: z.ZodOptional<z.ZodObject<{
        sessionStartTime: z.ZodString;
        promptCount: z.ZodNumber;
        lastPromptTokenCount: z.ZodNumber;
        metrics: z.ZodAny;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type StatsResponse = z.infer<typeof statsResponseSchema>;
//# sourceMappingURL=statsResponseSchema.d.ts.map