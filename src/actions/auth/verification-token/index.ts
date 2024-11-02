"use server"

import { getVerificationTokenByToken } from "@/db/query/token";
import { errorCode } from "@/constants";
import {
  createVerificationToken,
  deleteVerificationToken,
  findVerificationTokenByIdentifier,
} from "@/db/query/token";
import { checkExistingUserAccountWithEmail } from "@/db/query/user";
import { v4 as uuid } from "uuid";

export const handleCreateVerificationToken = async ({
  expiresMinutes = 10,
  identifier,
}: {
  expiresMinutes?: number;
  identifier: string;
}) => {
  const newToken = uuid();
  const expires = new Date(new Date().getTime() + expiresMinutes * 60 * 1000); //10 minutos default

  try {
    // TODO:Check if email is already taken (user with email)

    // check if email is already taken (account type as email)
    const isEmailTaken = await checkExistingUserAccountWithEmail(identifier);
    if (isEmailTaken) {
      throw new Error(errorCode.EMAIL_ALREADY_TAKEN);
    }

    const existingToken = await findVerificationTokenByIdentifier(identifier);

    if (existingToken) {
      await deleteVerificationToken(
        existingToken.identifier,
        existingToken.token
      );
    }

    const verificationToken = await createVerificationToken({
      identifier,
      token: newToken,
      expires,
    });

    return verificationToken;
  } catch (error) {
    console.error("Failed to create verification token", error);
    if (error instanceof Error && error.message in errorCode) {
      throw error;
    }

    throw error;
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
