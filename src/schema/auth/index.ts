import { z } from "zod";

export const SignInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6, "Deve ter pelo menos 6 caracteres"),
	// TODO: Apply regex when resolve error message styles
	// .regex(
	//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,}$/,
	//   "Deve ter pelo menos 6 caracteres:\n- Uma letra maiúscula\n- Uma letra minúscula\n- Um número\n- Um caractere especial (@$!%*?&)"
	// ),
	code: z.optional(z.string()),
});

export const SignUpSchema = z.object({
	email: z.string().email("Email inválido"),
});

export const RegisterSchemaForm = z.object({
	name: z.string().min(5),
	password: z.string().min(6),
	password2: z.string().min(6),
});

export const RegisterSchema = z.object({
	name: z.string().min(5),
	email: z.string().email(),
	password: z.string().min(6),
	password2: z.string().min(6),
	token: z.string().uuid(),
});
