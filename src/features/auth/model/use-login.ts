import { rqClient } from "@/shared/api/instance.ts";
import { ROUTES } from "@/shared/model/routes.ts";
import { useNavigate } from "react-router-dom";
import { ApiSchemas } from "@/shared/api/schema";

export const useLogin = () => {
  const navigate = useNavigate();
  const loginMutation = rqClient.useMutation("post", "/auth/login", {
    onSuccess: () => {
      navigate(ROUTES.HOME);
    },
  });

  const login = (data: ApiSchemas["LoginRequest"]) => {
    loginMutation.mutate({ body: data });
  };

  const errorMessage = loginMutation.isError
    ? loginMutation.error.message
    : undefined;

  return {
    login,
    isPending: loginMutation.isPending,
    errorMessage
  };
};
