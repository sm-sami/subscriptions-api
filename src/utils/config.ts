import { z } from "zod";
import "dotenv/config";

const configSchema = z.object({
  PORT: z.string().regex(/^\d+$/).optional().default("3000"),
  DB_URL: z.string().url().startsWith("postgres://"),
  AUTH_TOKEN: z.string(),
});

export const { PORT, DB_URL, AUTH_TOKEN } = configSchema.parse(process.env);
