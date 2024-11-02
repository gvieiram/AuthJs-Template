import type { ErrorDescription } from "@/types/error";

export const errorCode = {
  TOKEN_NOT_FOUND: "TOKEN_NOT_FOUND",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  SERVER_ERROR: "SERVER_ERROR",
  VERIFICATION_TOKEN_NOT_FOUND: "VERIFICATION_TOKEN_NOT_FOUND",
  VERIFICATION_TOKEN_FAILED_TO_SEND_EMAIL:
    "VERIFICATION_TOKEN_FAILED_TO_SEND_EMAIL",
  VERIFICATION_TOKEN_EXPIRED: "VERIFICATION_TOKEN_EXPIRED",
  INVALID_DATA: "INVALID_DATA",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  PASSWORDS_DO_NOT_MATCH: "PASSWORDS_DO_NOT_MATCH",
  USER_CREATION_FAILED: "USER_CREATION_FAILED",
  EMAIL_ALREADY_TAKEN: "EMAIL_ALREADY_TAKEN",
  USER_ACCOUNT_CREATION_FAILED: "USER_ACCOUNT_CREATION_FAILED",
} as const;

const defaultErrorTitle = "Ops! Algo de errado aconteceu!";
const defaultErrorDescription = "Por favor, tente novamente.";

export const errorDescription: ErrorDescription = {
  TOKEN_NOT_FOUND: {
    title: defaultErrorTitle,
    description: "Token não encontrado, tente cadastrar novamente.",
  },
  TOKEN_EXPIRED: {
    title: defaultErrorTitle,
    description: "Token expirado, tente cadastrar novamente.",
  },
  SERVER_ERROR: {
    title: defaultErrorTitle,
    description: "Ocorreu um erro no servidor, tente novamente mais tarde.",
  },
  VERIFICATION_TOKEN_NOT_FOUND: {
    title: defaultErrorTitle,
    description:
      "Código de verificação não encontrado, tente cadastrar novamente.",
  },
  VERIFICATION_TOKEN_EXPIRED: {
    title: defaultErrorTitle,
    description: "Código de verificação expirado, tente cadastrar novamente.",
  },
  INVALID_DATA: {
    title: defaultErrorTitle,
    description: "Erro ao processar os dados, tente novamente.",
  },
  USER_ALREADY_EXISTS: {
    title: defaultErrorTitle,
    description: "O e-mail já está em uso, tente cadastrar com outro.",
  },
  EMAIL_ALREADY_TAKEN: {
    title: defaultErrorTitle,
    description: "O e-mail já está em uso, tente cadastrar outro.",
  },
  PASSWORDS_DO_NOT_MATCH: {
    title: defaultErrorTitle,
    description: "As senhas não correspondem, tente novamente.",
  },
  USER_CREATION_FAILED: {
    title: defaultErrorTitle,
    description: defaultErrorDescription,
  },
  VERIFICATION_TOKEN_FAILED_TO_SEND_EMAIL: {
    title: defaultErrorTitle,
    description: "Falha ao enviar e-mail de verificação",
  },
  USER_ACCOUNT_CREATION_FAILED: {
    title: defaultErrorTitle,
    description: "Falha ao criar conta de usuário",
  },
};
