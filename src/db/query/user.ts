import { prisma } from "@/db";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Could not fetch user.", { cause: error });
  }
}

export async function checkUserHasOauthAccount(email: string) {
  const userWithOauthAccount = await prisma.user.findFirst({
    where: {
      email: email.trim(),
      accounts: {
        some: {
          type: {
            in: ["oauth", "oidc"],
          },
        },
      },
    },
    select: {
      id: true,
    },
  });

  return !!userWithOauthAccount;
}

export async function createUser({
  data,
  emailVerified = null,
}: {
  data: {
    name: string;
    email: string;
    password: string;
  };
  emailVerified?: Date | null;
}) {
  const user = await prisma.user.create({
    data: {
      ...data,
      emailVerified,
      // role: UserRole.DEFAULT,
    },
  });

  return user;
}

export const createUserAccountWithCredentials = async (email: string) => {
  const account = await prisma.account.create({
    data: {
      type: "credentials",
      provider: "credentials",
      providerAccountId: email,
      user: {
        connect: {
          email: email,
        },
      },
    },
  });

  return account;
};

export const checkExistingUserAccountWithEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
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

  return !!user;
};
