import type { errorCode } from "@/constants";

export type ErrorCode = keyof typeof errorCode;
export type ErrorDescription = Record<
	ErrorCode,
	{ title: string; description: string }
>;

export class CustomError extends Error {
	constructor(message: ErrorCode) {
		super(message);
		this.name = "CustomError";
	}
}
