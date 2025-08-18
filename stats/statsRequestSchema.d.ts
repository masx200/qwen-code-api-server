import { z } from "zod";
export declare const statsRequestSchema: z.ZodObject<{
    sessionId: z.ZodString;
}, z.core.$strip>;
export type StatsRequest = z.infer<typeof statsRequestSchema>;
//# sourceMappingURL=statsRequestSchema.d.ts.map