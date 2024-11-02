import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
	title: "AuthJS Template",
	description: "AuthJS Template",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<html lang="pt-BR">
			<body className="antialiased dark" suppressHydrationWarning>
				<SessionProvider session={session}>
					<Toaster />
					{children}
				</SessionProvider>
			</body>
		</html>
	);
}
