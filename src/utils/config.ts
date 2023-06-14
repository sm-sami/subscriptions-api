import { z } from "zod";
import "dotenv/config";

const configSchema = z.object({
  PORT: z.string().default("3000"),
  DB_URL: z.string().url(),
});

export const { PORT, DB_URL } = configSchema.parse(process.env);
