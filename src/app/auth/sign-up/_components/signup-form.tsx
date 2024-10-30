"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";

export function SignUpForm() {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  // TODO: Tratar erros de validação
  const signUpSchema = z.object({
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    console.log(data);
    startTransition(async () => {
      try {
        // const response = await signIn("credentials", {
        //   email: data.email,
        // });

        toast({
          title: "Você está quase lá!",
          description: "Dá uma olhada no seu e-mail para finalizar o cadastro!",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Ocorreu um erro!",
          description: "Ocorreu um erro ao enviar o e-mail.",
          variant: "destructive",
          action: (
            <ToastAction altText="Tente novamente" onClick={() => {}}>
              Tente novamente
            </ToastAction>
          ),
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email@provedor.com.br"
                  autoComplete="email"
                  required
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormDescription className="hidden">Seu e-mail.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" isLoading={isPending}>
          Entrar
        </Button>
      </form>
    </Form>
  );
}
