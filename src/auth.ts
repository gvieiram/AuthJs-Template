import { prisma } from "@/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcryptjs from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./db/query/user";
import { privateRoutesArray, publicRoutes, redirectRules } from "./routes";
import { SignInSchema } from "./schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: publicRoutes.LOGIN,
  },
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      async authorize(credentials) {
        const validCredentials = SignInSchema.safeParse(credentials);
        if (!validCredentials.success) {
          throw new Error("Invalid sign-in credentials");
        }
        const user = await getUserByEmail(validCredentials.data.email);

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        const passwordMatch = await bcryptjs.compare(
          validCredentials.data.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;

      const isProtected = privateRoutesArray.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      // Prevent logged in users from accessing sign-up page
      // Users logged in don't need to access sign-up page (usability)
      const redirectPathsForLoggedUsers = redirectRules.loggedIn.paths;
      const isRedirectPathForLoggedUsers = redirectPathsForLoggedUsers.some(
        (path) => nextUrl.pathname.startsWith(path)
      );
      if (isRedirectPathForLoggedUsers && isLoggedIn) {
        return Response.redirect(
          new URL(redirectRules.loggedIn.to, nextUrl.origin)
        );
      }

      // Redirect unauthenticated users to sign-in page
      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL(
          redirectRules.unauthenticated.to,
          nextUrl.origin
        );
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }

      return true;
    },
    async session({ session, user }) {
      session.user = user;
      return session;
    },
  },
});
