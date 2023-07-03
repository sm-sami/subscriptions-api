import { NewUser, User, users } from "../schema";
import { getEmailClient } from "../utils/email";
import { VerificationEmail } from "../templates";
import db from "../utils/db";
import md5 from "md5";
import crypto from "crypto";
import { SendEmailCommand } from "@aws-sdk/client-ses";
import { eq } from "drizzle-orm";
import { render } from "@react-email/render";
import { FROM_EMAIL, FROM_NAME } from "../utils/config";

export const addUser = async (
  user: NewUser
): Promise<{ user: User; code: string }> => {
  try {
    const code = crypto.randomBytes(32).toString("hex");
    const hashedCode = await md5(code);
    const [newUser] = await db
      .insert(users)
      .values({ ...user, code: hashedCode })
      .returning();

    return { user: newUser, code };
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

export const sendVerificationEmail = async (
  baseUrl: string,
  name: string,
  email: string,
  code: string
) => {
  const client = getEmailClient();
  const emailHtml = render(VerificationEmail({ baseUrl, name, email, code }));

  const params = {
    Source: `${FROM_NAME} <${FROM_EMAIL}>`,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: "Verify your email!",
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailHtml,
        },
      },
    },
  };

  const command = new SendEmailCommand(params);

  const res = await client.send(command);
  return res.$metadata.httpStatusCode;
};
