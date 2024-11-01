import type { SuccessDescription } from "@/types/success";

export const successCode = {
  USER_CREATED: "USER_CREATED",
} as const;

export const successDescription: SuccessDescription = {
  USER_CREATED: {
    title: "Usuário criado com sucesso!",
    description: "Faça login para continuar.",
  },
};
