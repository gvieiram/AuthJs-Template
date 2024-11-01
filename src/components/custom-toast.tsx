"use client";

import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { ToastAction } from "./ui/toast";

export const customToast = ({
  title,
  description,
  variant,
  action,
}: {
  title: string;
  description: string;
  variant?: "default" | "destructive";
  action?: {
    text: string;
    redirectPath?: string;
    type?: "button" | "submit" | "reset";
  };
}) => {
  const redirectToPath = (path: string) => {
    redirect(path);
  };

  const toastInstance = toast({
    title,
    description,
    variant: variant || "destructive",
    duration: 5000,
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
