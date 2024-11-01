"use server";

import { sendVerificationTokenEmail } from "@/actions/emails";
import { errorCode } from "@/constants";
import {
  createVerificationToken,
  deleteVerificationToken,
  getVerificationTokenByToken,
} from "@/db/query/token";
import { createUser, getUserByEmail } from "@/db/query/user";
import { RegisterSchema, SignUpSchema } from "@/schema";
import bcryptjs from "bcryptjs";
import type { z } from "zod";

// =============================== signUp ===============================
export const signUp = async (data: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(data);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Dados inválidos!",
      resetKey: "",
    };
  }

  try {
    const verificationToken = await createVerificationToken(
      validatedFields.data.email
    );

    const emailData = await sendVerificationTokenEmail(
      verificationToken.identifier,
      verificationToken.token,
      verificationToken.expires
    );

    if (!emailData.success) {
      return {
        type: "error",
        errors: {
          email: undefined,
        },
        message: "Ocorreu um erro ao enviar o e-mail.",
        resetKey: "",
      };
    }

    return {
      type: "success",
      errors: null,
      message: "Dá uma olhada no seu e-mail para finalizar o cadastro!",
      resetKey: Date.now().toString(),
    };
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    console.error("Failed to signUp", error);
    return {
      type: "error",
      errors: {
        email: undefined,
      },
      message: error.message || "Ocorreu um erro ao enviar o e-mail.",
      resetKey: "",
    };
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

    await deleteVerificationToken(email, token);

    return user;
  } catch (error) {
    if (error instanceof Error && error.message in errorCode) {
      throw error;
    }

    throw new Error(errorCode.USER_CREATION_FAILED);
  }
};

export const getVerificationToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    throw new Error(errorCode.VERIFICATION_TOKEN_NOT_FOUND);
  }

  const isTokenExpired = new Date(existingToken.expires) < new Date();

  if (isTokenExpired) {
    throw new Error(errorCode.TOKEN_EXPIRED);
  }

  return existingToken;
};
