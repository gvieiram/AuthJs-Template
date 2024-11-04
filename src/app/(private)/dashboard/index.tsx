"use client";

import { Button } from "@/components/ui/button";
import { publicRoutes } from "@/routes";
import { User } from "next-auth";
import Link from "next/link";

export default function DashboardPage({ userData, signOut }: { userData: User | undefined, signOut: () => void }) {

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold text-primary">Dashboard</h1>
          <p className="text-muted-foreground">Path Protected</p>
        </div>

        {userData ? (
          <ul>
            {userData && Object.entries(userData).map(([key, value]) => (
              <li key={key}>{key}: {value}</li>
            ))}
          </ul>
        ) : (
          <p>Carregando dados do usuário...</p>
        )}

        <div className="flex gap-2">
          <Link href={publicRoutes.HOME}>
            <Button variant="link" className="p-0">{"< Go to public page"}</Button>
          </Link>
          <Button variant="destructive" onClick={() => signOut()}>Logout</Button>
        </div>
      </div>
    </div>
  );
}