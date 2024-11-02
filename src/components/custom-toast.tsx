"use client";

import { toast } from "@/hooks/use-toast";
import { toastMessage } from "@/utils/toastMessage";
import { redirect } from "next/navigation";
import { ToastAction } from "./ui/toast";

export const customToast = ({
  title,
  description,
  variant,
  action,
  toastCode,
}: {
  title?: string;
  description?: string;
  variant?: "destructive" | "success" | "default";
  action?: {
    text: string;
    redirectPath?: string;
    type?: "button" | "submit" | "reset";
  };
  toastCode?: string;
}) => {
  const redirectToPath = (path: string) => {
    redirect(path);
  };

  const toastMessages = toastCode
    ? toastMessage(toastCode)
    : { title, description, variant: "default" };

  const toastVariant = toastMessages.variant ? toastMessages.variant : variant;

  const toastInstance = toast({
    title: toastMessages.title,
    description: toastMessages.description,
    variant: toastVariant === "destructive" ? "destructive" : "default",
    duration: 5000,
    className: toastVariant === "success" ? "bg-success-toast " : undefined,
    action: action && (
      <ToastAction
        altText={action.text}
        onClick={() => {
          toastInstance.dismiss();
          action.redirectPath && redirectToPath(action.redirectPath);
        }}
        type={action.type || "button"}
      >
        {action.text}
      </ToastAction>
    ),
    onAnimationEnd(event) {
      event.preventDefault();
      if (event.animationName === "exit") {
        return action?.redirectPath && redirectToPath(action.redirectPath);
      }
    },
  });

  return toastInstance;
};
