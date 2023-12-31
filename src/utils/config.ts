import { z } from "zod";
import "dotenv/config";

const configSchema = z.object({
  PORT: z.string().regex(/^\d+$/).optional().default("3000"),
  API_BASE_URL: z.string().url().default("http://localhost:3000"),
  DB_URL: z.string().url().startsWith("postgres://"),
  FROM_NAME: z.string().default("Verify"),
  FROM_EMAIL: z.string().email(),
  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AUTH_TOKEN: z.string(),
});

export const {
  PORT,
  API_BASE_URL,
  DB_URL,
  FROM_NAME,
  FROM_EMAIL,
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AUTH_TOKEN,
} = configSchema.parse(process.env);
