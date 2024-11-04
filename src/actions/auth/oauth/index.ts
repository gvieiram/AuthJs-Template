import { signIn } from "@/auth";
import { privateRoutes } from "@/routes";

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
