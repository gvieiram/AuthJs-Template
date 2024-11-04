"use server";

import { signIn as signInAuth } from "@/auth";
import { errorCode } from "@/constants";
import { getUserByEmail } from "@/db/query/user";
import { redirectRules } from "@/routes";
import { SignInSchema } from "@/schema/auth";
import { z } from "zod";


export const signIn = async (credentials: z.infer<typeof SignInSchema>) => {
  const validatedCredentials = SignInSchema.parse(credentials);

  if (!validatedCredentials) {
    throw new Error(errorCode.INVALID_CREDENTIALS);
  }

  const { email, password } = validatedCredentials;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error(errorCode.USER_NOT_FOUND);
    }

    if (!user.emailVerified) {
      throw new Error("Email não verificado");
    }

    const resp = await signInAuth("credentials", {
      email,
      password,
      redirectTo: redirectRules.authLoginRedirect.to,
    });

    if (!resp) {
      throw new Error("Falha ao autenticar");
    }

  } catch (error) {
    console.error("Error on signIn", error);
    if (error instanceof Error && error.message === errorCode.INVALID_CREDENTIALS) {
      throw error;
    }
    throw error;
  }
}

