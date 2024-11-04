import { Button } from "@/components/ui/button";
import { privateRoutes, publicRoutes } from "@/routes";
import Link from "next/link";

export default async function Home() {
	return (
		<main className="h-screen w-full mx-auto">
			<div className="flex flex-col items-center justify-center h-full">
				<h1 className="text-4xl font-bold text-primary">AuthJS Template</h1>
				<p className="text-muted-foreground">
					Template for creating applications with AuthJS with Prisma and NextJS
				</p>
				<div className="flex gap-2 my-4">
					<Link href={publicRoutes.LOGIN}>
						<Button variant="outline">Sign in</Button>
					</Link>
					<Link href={publicRoutes.REGISTER}>
						<Button>Sign up</Button>
					</Link>
				</div>

				<Link href={privateRoutes.DASHBOARD}>
					<Button variant={"secondary"}>Dashboard (private route)</Button>
				</Link>
			</div>
		</main>
	);
}
