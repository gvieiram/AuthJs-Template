import { FormCard } from "@/components/form-card";
import { RegisterForm } from "./_components/register-form";

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  return (
    //TODO:
    // Verificar se o token é valido (token !== null || token.expiresAt > new Date())
    //  - Se nao for
    //    - Disparar um toast de erro
    //    - Redirecionar para "/home" ou "/auth/sign-up" (com mensagem de erro)
    //  - Se for, redirecionar para a pagina de login ou autenticar o usuario e redirecionar para pagina inicial (autenticado)

    <div className="flex flex-col h-screen w-full items-center justify-center px-4">
      <FormCard
        title="Criar conta"
        description="Insira seus dados para finalizar o cadastro"
        redirectLink={{
          text: "Já tem uma conta?",
          btnText: "Faça login",
          href: "/auth/sign-in",
        }}
      >
        {/* TODO: Preencher o email com o email do token */}
        <RegisterForm email="email@email.com" />
      </FormCard>
    </div>
  );
}
