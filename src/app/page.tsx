import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<main className="h-screen w-full mx-auto">
			<div className="flex flex-col items-center justify-center h-full">
				<h1 className="text-4xl font-bold text-primary">AuthJS Template</h1>
				<p className="text-muted-foreground">
					Template for creating applications with AuthJS with Prisma and NextJS
				</p>
				<div className="flex gap-2 mt-4">
					<Link href="/auth/sign-in">
						<Button variant="outline">Sign in</Button>
					</Link>
					<Link href="/auth/sign-up">
						<Button>Sign up</Button>
					</Link>
				</div>
			</div>
		</main>
	);
}
