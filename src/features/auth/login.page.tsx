import { rqClient } from "@/shared/api/instance.ts";
import { AuthLayout } from "@/features/auth/auth-layout.tsx";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes.ts";
import { LoginForm } from "@/features/auth/login-form.tsx";

const LoginPage = () => {
  const loginMutation = rqClient.useMutation("post", "/auth/login", {});

  return (
    <AuthLayout
      title={"Вход в систему"}
      description={"Введите ваш email и пароль для входа в систему"}
      footerText={
        <>
          Нет аккаунта?{" "}
          <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>{" "}
        </>
      }
      form={<LoginForm />}
    />
  );
};

export const Component = LoginPage;
