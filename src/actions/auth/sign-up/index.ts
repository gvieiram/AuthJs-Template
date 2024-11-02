"use server";

import { sendVerificationTokenEmail } from "@/actions/emails";
import { EMAIL_MINUTES, errorCode, successCode } from "@/constants";
import { deleteVerificationToken } from "@/db/query/token";
import {
  createUser,
  createUserAccountWithCredentials,
  getUserByEmail,
} from "@/db/query/user";
import { RegisterSchema, SignUpSchema } from "@/schema";
import bcryptjs from "bcryptjs";
import type { z } from "zod";
import { handleCreateVerificationToken } from "../verification-token";

// =============================== signUp ===============================
export const signUp = async (data: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(data);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    throw new Error(errorCode.INVALID_DATA);
  }

  try {
    const { email } = validatedFields.data;
    const verificationToken = await handleCreateVerificationToken({
      identifier: email,
      expiresMinutes: EMAIL_MINUTES,
    });

    const emailData = await sendVerificationTokenEmail(
      verificationToken.identifier,
      verificationToken.token,
      verificationToken.expires
    );

    if (!emailData.success) {
      throw new Error(errorCode.VERIFICATION_TOKEN_FAILED_TO_SEND_EMAIL);
    }

    return {
      success: true,
      errors: null,
      code: successCode.VERIFICATION_TOKEN_SENT_TO_EMAIL,
    };
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    console.error("Failed to signUp", error);
    if (error instanceof Error && error.message in errorCode) {
      throw error;
    }

    throw new Error(errorCode.USER_CREATION_FAILED);
  }
};

// =============================== register ===============================
export const register = async (
  data: z.infer<typeof RegisterSchema>,
  emailVerified?: Date
) => {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    throw new Error(errorCode.INVALID_DATA);
  }

  try {
    const { name, email, password, password2, token } = data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new Error(errorCode.USER_ALREADY_EXISTS);
    }

    if (password !== password2) {
      throw new Error(errorCode.PASSWORDS_DO_NOT_MATCH);
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await createUser({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      emailVerified,
    });

    if (!user) {
      throw new Error(errorCode.USER_CREATION_FAILED);
    }

    const userAccount = await createUserAccountWithCredentials(email);

    if (!userAccount) {
      throw new Error(errorCode.USER_ACCOUNT_CREATION_FAILED);
    }

    await deleteVerificationToken(email, token);

    return {
      success: true,
      errors: null,
      code: successCode.USER_CREATED,
      data: {
        user,
        userAccount,
      },
    };
  } catch (error) {
    if (error instanceof Error && error.message in errorCode) {
      throw error;
    }

    throw new Error(errorCode.USER_CREATION_FAILED);
  }
};
