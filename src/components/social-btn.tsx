import { oauthLogin } from "@/actions/auth/oauth";
import { privateRoutes } from "@/routes";
import type { ReactNode } from "react";
import { Button } from "./ui/button";

export const SocialButton = ({
	children,
	size = "md",
	oauthProvider,
}: {
	children: ReactNode;
	size?: "sm" | "md" | "lg";
	oauthProvider?: string;
}) => {
	const sizeClass = size === "sm" ? "1rem" : size === "md" ? "2rem" : "2rem";

	const handleClick = () => {
		oauthProvider &&
			oauthLogin({
				provider: oauthProvider,
				redirect: true,
				callbackUrl: privateRoutes.DASHBOARD,
			});
	};

	return (
		<Button
			variant="outline"
			className="size-14 rounded-2xl group flex items-center justify-center"
			onClick={handleClick}
		>
			<span className="transition-transform duration-300 group-hover:-translate-y-1">
				{children}
			</span>
		</Button>
	);
};
