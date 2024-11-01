import type { successCode } from "@/constants/success-handler";

export type SuccessCode = keyof typeof successCode;
export type SuccessDescription = Record<
  SuccessCode,
  { title: string; description: string }
>;
