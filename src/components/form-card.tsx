"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import type { ReactNode } from "react";
import { FaApple, FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { SocialButton } from "./social-btn";
import { Button } from "./ui/button";

interface FormCardProps {
	title: string;
	description: string;
	children: ReactNode;
	socialLogin?: boolean;
	redirectLink?: {
		text: string;
		btnText: string;
		href: string;
	};
}

export function FormCard({
	title,
	description,
	children,
	socialLogin,
	redirectLink,
}: FormCardProps) {
	return (
		<Card className="mx-auto max-w-sm sm:min-w-96">
			<CardHeader>
				<CardTitle className="text-2xl">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-4">
					<div className="grid gap-4">{children}</div>

					{socialLogin && (
						<>
							<p className="text-center text-muted-foreground text-xs">
								Ou faça login com:
							</p>

							<div className="flex flex-row gap-4 flex-wrap items-center justify-center">
								<SocialButton oauthProvider="google">
									<FcGoogle style={{ width: "2rem", height: "2rem" }} />
								</SocialButton>
								<SocialButton>
									<FaApple
										style={{ width: "2rem", height: "2rem" }}
										className="text-[#555555] dark:text-white"
									/>
								</SocialButton>
								<SocialButton>
									<FaFacebookF
										style={{ width: "2rem", height: "2rem" }}
										color="#4267B2"
									/>
								</SocialButton>
							</div>
						</>
					)}
				</div>

				{redirectLink && (
					<div className="flex flex-row gap-2 items-center justify-center text-xs mt-4">
						<p className="text-center">{redirectLink.text}</p>
						<Link href={redirectLink.href}>
							<Button variant="link" className="p-0 text-xs">
								{redirectLink.btnText}
							</Button>
						</Link>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
