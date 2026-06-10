import { useParams } from "react-router-dom";
import { PathParams, ROUTES } from "@/shared/model/routes.ts";

const BoardPage = () => {
  const params = useParams<PathParams[typeof ROUTES.BOARD]>();

  return <div>Board Page {params.boardId}</div>;
};

export const Component = BoardPage;
