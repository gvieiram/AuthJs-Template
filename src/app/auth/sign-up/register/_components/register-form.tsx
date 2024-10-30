"use client";

import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
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
} from "../../../../../components/ui/form";

export function RegisterForm({ email }: { email: string }) {
	const [isPending, startTransition] = useTransition();

	// TODO: Tratar erros de validação
	const signUpSchema = z.object({
		name: z.string().min(5, "Nome completo!"),
		email: z.string().email(),
		password: z
			.string()
			.min(6, "Deve ter pelo menos 6 caracteres")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,}$/,
				"Deve ter pelo menos 6 caracteres:\n- Uma letra maiúscula\n- Uma letra minúscula\n- Um número\n- Um caractere especial (@$!%*?&)",
			),
	});

	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: email,
			password: "",
		},
	});

	const onSubmit = (data: z.infer<typeof signUpSchema>) => {
		startTransition(async () => {
			console.log(">>> ", data);
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
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome completo</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="João da Silva"
									required
									{...field}
								/>
							</FormControl>
							<FormDescription className="hidden">
								Seu nome completo.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
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
									value={email}
									disabled={!!email}
								/>
							</FormControl>
							<FormDescription className="hidden">Seu e-mail.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
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
				<Button type="submit" className="w-full" isLoading={isPending}>
					Login
				</Button>
			</form>
		</Form>
	);
}
