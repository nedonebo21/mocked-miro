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

const loginSchema = z.object({
  email: z.email("Неверный email"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
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
        </FieldGroup>
        <Button type={"submit"}>Войти</Button>
      </form>
    </FieldSet>
  );
};
