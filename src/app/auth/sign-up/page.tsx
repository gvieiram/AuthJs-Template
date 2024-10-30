import { FormCard } from "@/components/form-card";
import { SignUpForm } from "./_components/signup-form";

// TODO: Implementar a logica de envio de email com link de confirmacao
export default function SignUpPage() {
	return (
		<div className="flex flex-col h-screen w-full items-center justify-center px-4">
			<FormCard
				title="Cadastro"
				description="Insira seu e-mail abaixo para criar sua conta"
				redirectLink={{
					text: "Já tem uma conta?",
					btnText: "Faça login",
					href: "/auth/sign-in",
				}}
				socialLogin={true}
			>
				<SignUpForm />
			</FormCard>
		</div>
	);
}
