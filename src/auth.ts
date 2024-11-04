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
	secret: process.env.AUTH_SECRET,
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
					user.password,
				);

				if (!passwordMatch) {
					throw new Error("Invalid password");
				}

				return user;
			},
		}),
	],
	callbacks: {
		async signIn({ account, user, credentials }) {
			if (user.email) {
				const registeredUser = await getUserByEmail(user?.email);
				if (!registeredUser?.emailVerified) {
					console.error("Email não verificado");
					return false;
				}
			}

			return true;
		},
		async authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isProtected = privateRoutesArray.some((path) =>
				nextUrl.pathname.startsWith(path),
			);

			if (isProtected && !isLoggedIn) {
				const redirectUrl = new URL(
					redirectRules.unauthenticated.to,
					nextUrl.origin,
				);
				redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
				return Response.redirect(redirectUrl);
			}

			return true;
		},
		async jwt({ token, user }) {
			if (user) {
				token.user = {
					...user,
					password: undefined,
					role: "DEFAULT",
					subscription: "FREE",
				};
			}
			return token;
		},
		async session({ session, token, }) {
			session.user = {
				...session.user,
				// @ts-ignore
				...token.user,
			};
			return session;
		},
	},
});
