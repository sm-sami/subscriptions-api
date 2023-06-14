import { NewUser, User, users } from "../schema/user-schema";
import db from "../utils/db";
import md5 from "md5";
import crypto from "crypto";
import { eq } from "drizzle-orm";

export const addUser = async (user: NewUser): Promise<User> => {
  try {
    const code = crypto.randomBytes(32).toString("hex");
    console.info("code", code);
    const hashedCode = await md5(code);
    const [newUser] = await db
      .insert(users)
      .values({ ...user, code: hashedCode })
      .returning();

    return newUser;
  } catch (err) {
    throw err;
  }
};

export const verifyUser = async (
  email: string,
  code: string
): Promise<boolean> => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    const isVerified = md5(code) === user.code;

    const [updatedUser] = await db
      .update(users)
      .set({ isVerified })
      .returning();

    return updatedUser.isVerified;
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (email: string) => {
  try {
    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.email, email))
      .returning();

    return deletedUser;
  } catch (err) {
    throw err;
  }
};
