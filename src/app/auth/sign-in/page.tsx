import { FormCard } from "@/components/form-card";
import { publicRoutes } from "@/routes";
import { LoginForm } from "./_components/login-form";

export default async function SignIn({
  searchParams,
}: {
  searchParams?: {
    error?: string;
  };
}) {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center px-4">
      <FormCard
        title="Login"
        description="Insira seu e-mail e senha para logar"
        redirectLink={{
          text: "Não tem uma conta?",
          btnText: "Cadastre-se",
          href: publicRoutes.REGISTER,
        }}
        socialLogin={true}
      >
        <LoginForm />
      </FormCard>
    </div>
  );
}
