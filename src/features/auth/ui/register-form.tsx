import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/ui/kit/field.tsx";
import { Input } from "@/shared/ui/kit/input.tsx";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/shared/ui/kit/button.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/features/auth/model/use-register.ts";

const registerSchema = z
  .object({
    email: z.email("Неверный email"),
    password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });

export const RegisterForm = () => {
  const {register, isPending, errorMessage} = useRegister()

  const form = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
    register(data)
  });

  return (
    <FieldSet className="w-full max-w-xs">
      <form noValidate onSubmit={onSubmit} className={"flex flex-col gap-4"}>
        <FieldGroup>
          <Controller
            name={"email"}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  className={
                    fieldState.error ? "border-red-500 text-red-500" : ""
                  }
                  type="text"
                  placeholder="Email"
                  {...field}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />
          <Controller
            name={"password"}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="password">Пароль</FieldLabel>
                <Input
                  id="password"
                  className={
                    fieldState.error ? "border-red-500 text-red-500" : ""
                  }
                  type="password"
                  placeholder="••••••••"
                  {...field}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />
          <Controller
            name={"confirmPassword"}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Подтвердите пароль
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  className={
                    fieldState.error ? "border-red-500 text-red-500" : ""
                  }
                  type="password"
                  placeholder="••••••••"
                  {...field}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />
        </FieldGroup>
        {errorMessage && (
          <p className={"text-destructive text-sm"}>{errorMessage}</p>
        )}
        <Button type={"submit"} disabled={isPending}>Зарегистрироваться</Button>
      </form>
    </FieldSet>
  );
};
