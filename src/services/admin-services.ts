import { users } from "../schema";
import db from "../utils/db";
import { eq } from "drizzle-orm";

export const getAllVerifiedUsers = async () => {
  try {
    return await db
      .select({ name: users.name, email: users.email })
      .from(users)
      .where(eq(users.isVerified, true));
  } catch (err) {
    throw err;
  }
};

export const deleteAllUnverifiedUsers = async () => {
  try {
    const deletedUsers = await db
      .delete(users)
      .where(eq(users.isVerified, false))
      .returning({ deletedId: users.email });
    return deletedUsers.length;
  } catch (err) {
    throw err;
  }
};
