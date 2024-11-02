import type { successCode } from "@/constants";

export type SuccessCode = keyof typeof successCode;
export type SuccessDescription = Record<
	SuccessCode,
	{ title: string; description: string }
>;
