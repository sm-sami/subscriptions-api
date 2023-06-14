import { z } from "zod";
import "dotenv/config";

const configSchema = z.object({
  PORT: z.string().default("3000"),
});

export const { PORT } = configSchema.parse(process.env);
