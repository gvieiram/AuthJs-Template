import { privateRoutes } from "@/routes";
import { signIn } from "next-auth/react";

export const oauthLogin = async ({
	provider,
	redirect = true,
	callbackUrl = privateRoutes.DASHBOARD,
}: {
	provider: string;
	redirect?: boolean;
	callbackUrl?: string;
}) => {
	await signIn(provider, {
		redirect,
		callbackUrl,
	});
};
