import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card.tsx";
import { ReactNode } from "react";

type AuthLayoutProps = {
  form: ReactNode;
  title: ReactNode;
  description: ReactNode;
  footerText: ReactNode;
};

export const AuthLayout = ({
  form,
  title,
  description,
  footerText,
}: AuthLayoutProps) => {
  return (
    <main className={"grow flex flex-col pt-[200px] items-center"}>
      <Card className={"w-full max-w-[400px]"}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter>
          <p className={"text-sm text-muted-foreground"}>{footerText}</p>
        </CardFooter>
      </Card>
    </main>
  );
};
