import { auth } from "@/auth";
import DashboardPage from ".";
import { signOut } from "@/actions/auth";

export default async function Dashboard() {
	const session = await auth();

	return (
		<main className="h-screen w-full mx-auto">
			<DashboardPage userData={session?.user} signOut={signOut} />
		</main>
	);
}