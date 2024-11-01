import { prisma } from "@/db";
import { v4 as uuid } from "uuid";

export const createVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 10 * 60 * 1000); //10 minutos

  const existingToken = await findVerificationTokenByIdentifier(email);
  if (existingToken) {
    await deleteVerificationToken(
      existingToken.identifier,
      existingToken.token
    );
  }

  // check if email is already taken (account type as email)
  const existingUser = await prisma.user.findFirst({
    where: {
      email: email.trim(),
      accounts: {
        some: {
          type: "email",
        },
      },
    },
    select: {
      id: true,
    },
  });
  if (existingUser) {
    throw new Error("Usuário já possui uma conta com e-mail cadastrado");
  }

  // // Check if user already has an account with Oauth provider (check account type as oauth or oidc) && user has no password
  // // If user has an oauth account, send email with link to create password
  // const userHasOauthAccount = await checkUserHasOauthAccount(user.email);
  // if (userHasOauthAccount && !user.password) {
  //   const baseUrl = process.env.BASE_URL
  //     ? `${process.env.BASE_URL}`
  //     : "http://localhost:3000";

  //   await prisma.verificationToken.create({
  //   data: {
  //     identifier: email,
  //     token,
  //     expires,
  //   },
  // });

  //   // TODO: Send email with link to create password
  //   let addPasswordLink = `${baseUrl}/add-password?token=${token}`;
  //   // let emailData = await sendAddPasswordEmail(
  //   //   email,
  //   //   existingOAuthAccount[0].user.name!,
  //   //   addPasswordLink,
  //   //   5,
  //   // );
  //   // return emailData;

  //   return {
  //     success: true,
  //     error: null,
  //     message: "Email ",
  //     resetKey: "",
  //   };
  // }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const deleteVerificationToken = async (
  identifier: string,
  token: string
) => {
  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier,
        token,
      },
    },
  });
};

export const findVerificationTokenByIdentifier = async (identifier: string) => {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      identifier,
    },
  });
  return verificationToken;
};

export const getVerificationTokenByToken = async (token: string) => {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      token,
    },
  });

  return verificationToken;
};
