import { errorCode, errorDescription } from "@/constants";
import { successCode, successDescription } from "@/constants/success-handler";
import type { ErrorCode } from "@/types/error";
import type { SuccessCode } from "@/types/success";

export const toastMessage = (code: string) => {
  let alert = { title: "", description: "", variant: "default" };

  if (code in errorCode) {
    alert = { ...errorDescription[code as ErrorCode], variant: "destructive" };
  } else if (code in successCode) {
    alert = { ...successDescription[code as SuccessCode], variant: "success" };
  }

  return alert;
};
