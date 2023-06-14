import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { DB_URL } from "./config";

const queryClient = postgres(DB_URL);
export default drizzle(queryClient);
