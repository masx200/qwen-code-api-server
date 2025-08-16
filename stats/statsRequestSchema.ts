import { z } from "zod";

export const statsRequestSchema = z.object({
  sessionId: z.string().describe("会话ID"),
});

export type StatsRequest = z.infer<typeof statsRequestSchema>;
