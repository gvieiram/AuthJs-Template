"use client";

import { register } from "@/actions";
import { customToast } from "@/components/custom-toast";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { errorCode } from "@/constants";
import { successCode } from "@/constants/success-handler";
import { publicRoutes } from "@/routes";
import { RegisterSchema, RegisterSchemaForm } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";

export function RegisterForm({
  email,
  token,
  hasError,
}: {
  email: string;
  token: string;
  hasError: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchemaForm>>({
    resolver: zodResolver(RegisterSchemaForm),
    defaultValues: {
      name: "",
      password: "",
      password2: "",
    },
  });

  const onSubmit = (data: z.infer<typeof RegisterSchemaForm>) => {
    const dataWithEmail = { ...data, email, token };
    const validatedFields = RegisterSchema.safeParse(dataWithEmail);

    if (!validatedFields.success) {
      customToast({
        toastCode: errorCode.INVALID_DATA,
      });
      return;
    }

    startTransition(async () => {
      try {
        const resp = await register(dataWithEmail, new Date());

        if (resp) {
          router.push(publicRoutes.LOGIN);

          customToast({
            toastCode: successCode.USER_CREATED,
          });
        }
      } catch (error) {
        if (error instanceof Error && error.message in errorCode) {
          customToast({
            toastCode: error.message,
          });
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Nome completo"
                  required
                  {...field}
                />
              </FormControl>
              <FormDescription className="hidden">
                Seu nome completo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          render={() => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="email@email.com"
                value={email}
                disabled
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <PasswordInput required {...field} disabled={isPending} />
                </div>
              </FormControl>
              <FormDescription className="hidden">Sua senha.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <PasswordInput required {...field} disabled={isPending} />
                </div>
              </FormControl>
              <FormDescription className="hidden">
                Confirme sua senha.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          isLoading={isPending}
          disabled={hasError}
        >
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
