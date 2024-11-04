"use client";

import { signUp } from "@/actions/auth";
import { customToast } from "@/components/custom-toast";
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
import { Input } from "@/components/ui/input";
import { SignUpSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export function SignUpForm() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof SignUpSchema>>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
		startTransition(async () => {
			try {
				const { success, code: toastCode } = await signUp(data);

				if (success) {
					customToast({
						toastCode,
					});
				}
			} catch (error) {
				if (error instanceof Error) {
					customToast({
						toastCode: error.message,
					});
				}
			} finally {
				form.reset();
			}
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
				<Button type="submit" className="w-full" isLoading={isPending}>
					Entrar
				</Button>
			</form>
		</Form>
	);
}
