import { AppHeader } from "@/features/header";
import { Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes.ts";

export const App = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.REGISTER;

  return (
    <div className={"min-h-screen flex flex-col"}>
      {!isAuthPage && <AppHeader />}
      <Outlet />
    </div>
  );
};
