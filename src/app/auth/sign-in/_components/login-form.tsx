"use client";

import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../../../components/ui/form";

export function LoginForm() {
	const [isPending, startTransition] = useTransition();

	// TODO: Tratar erros de validação
	const signInSchema = z.object({
		email: z.string().email(),
		password: z
			.string()
			.min(6, "Deve ter pelo menos 6 caracteres")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,}$/,
				"Deve ter pelo menos 6 caracteres:\n- Uma letra maiúscula\n- Uma letra minúscula\n- Um número\n- Um caractere especial (@$!%*?&)",
			),
	});

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: z.infer<typeof signInSchema>) => {
		startTransition(async () => {
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
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="email@provedor.com.br"
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
						<Link href="/auth/forgot-password">
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
