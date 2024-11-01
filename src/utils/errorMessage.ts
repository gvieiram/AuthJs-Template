import { errorCode, errorDescription } from "@/constants";
import { successDescription } from "@/constants/success-handler";
import type { ErrorCode } from "@/types/error";
import type { SuccessCode } from "@/types/success";

export const errorMessage = (code: ErrorCode) => {
  const error = errorDescription[code];

  if (!error) {
    return errorDescription[errorCode.SERVER_ERROR as ErrorCode];
  }

  return error;
};

// TODO: Remover o errorMessage e successMessage e deixar apenas o toastMessage
export const successMessage = (code: SuccessCode) => {
  const success = successDescription[code];

  return success;
};
