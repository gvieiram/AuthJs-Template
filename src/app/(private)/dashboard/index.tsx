import { Button } from "@/components/ui/button";
import { publicRoutes } from "@/routes";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default async function Dashboard() {
  const { data: session } = useSession();

  return (
    <main className="h-screen w-full mx-auto">
      <h1 className="text-4xl font-bold text-primary">Dashboard</h1>
      <p className="text-muted-foreground">Path Protected</p>

      <p>{JSON.stringify(session?.user)}</p>

      <Link href={publicRoutes.HOME}>
        <Button variant="link">Go to public page</Button>
      </Link>
    </main>
  );
}
