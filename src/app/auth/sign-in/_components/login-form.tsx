"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input, PasswordInput } from "@/components/ui/input";
import { publicRoutes } from "@/routes";
import { SignInSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export function LoginForm() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof SignInSchema>>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: z.infer<typeof SignInSchema>) => {
		startTransition(async () => {
			console.log(">>> onSubmit ", data);
			// const response = await signIn("credentials", {
			//   email: data.email,
			//   password: data.password,
			// });
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="Email"
									autoComplete="email"
									required
									{...field}
									disabled={isPending}
								/>
							</FormControl>
							<FormDescription className="hidden">Seu e-mail.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex flex-col">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<div className="relative">
										<PasswordInput required {...field} disabled={isPending} />
									</div>
								</FormControl>
								<FormDescription className="hidden">Sua senha.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex flex-row gap-2 items-center justify-start text-xs">
						<p className="text-center ">Esqueceu sua senha?</p>
						<Link href={publicRoutes.FORGOT_PASSWORD}>
							<Button variant="link" className="p-0 text-xs">
								Recuperar
							</Button>
						</Link>
					</div>
				</div>
				<Button type="submit" className="w-full" isLoading={isPending}>
					Login
				</Button>
			</form>
		</Form>
	);
}
