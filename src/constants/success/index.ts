import type { SuccessDescription } from "@/types/success";

export const successCode = {
	USER_CREATED: "USER_CREATED",
	VERIFICATION_TOKEN_SENT_TO_EMAIL: "VERIFICATION_TOKEN_SENT_TO_EMAIL",
} as const;

export const successDescription: SuccessDescription = {
	USER_CREATED: {
		title: "Usuário criado com sucesso!",
		description: "Faça login para continuar.",
	},
	VERIFICATION_TOKEN_SENT_TO_EMAIL: {
		title: "E-mail de verificação enviado!",
		description: "Dá uma olhada no seu e-mail para finalizar o cadastro.",
	},
};
