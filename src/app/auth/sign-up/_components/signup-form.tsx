"use client";

import { signUp } from "@/actions/auth/sign-up";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { SignUpSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export function SignUpForm() {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
    startTransition(async () => {
      try {
        const { type, message } = await signUp(data);

        if (type === "error") {
          toast({
            title: "Ocorreu um erro! Toast 1",
            description: message,
            variant: "destructive",
          });
        }

        toast({
          title: "Você está quase lá!",
          description: message,
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
      } finally {
        form.reset();
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
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
