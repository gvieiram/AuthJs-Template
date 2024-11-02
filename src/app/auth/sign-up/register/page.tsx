"use client";

import { getVerificationToken } from "@/actions/auth/sign-up";
import { customToast } from "@/components/custom-toast";
import { FormCard } from "@/components/form-card";
import { errorCode } from "@/constants";
import { publicRoutes } from "@/routes";
import type { VerificationToken } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RegisterForm } from "./_components/register-form";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("code");

  const [verifiedToken, setVerifiedToken] = useState<VerificationToken>({
    expires: new Date(),
    identifier: "",
    token: "",
  });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!token) {
      customToast({
        toastCode: errorCode.VERIFICATION_TOKEN_NOT_FOUND,
      });
      return;
    }

    getVerificationToken(token)
      .then((res) => {
        setVerifiedToken(res);
      })
      .catch((error) => {
        setHasError(true);
        customToast({
          toastCode: error.message,
          action: {
            text: "Ir para cadastro",
            redirectPath: publicRoutes.REGISTER,
          },
        });
      });
  }, [token]);

  const { identifier } = verifiedToken;

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center px-4">
      <FormCard
        title="Criar conta"
        description="Insira seus dados para finalizar o cadastro"
        redirectLink={{
          text: "Já tem uma conta?",
          btnText: "Faça login",
          href: publicRoutes.LOGIN,
        }}
      >
        <RegisterForm
          email={identifier}
          token={verifiedToken.token}
          hasError={hasError}
        />
      </FormCard>
    </div>
  );
}
