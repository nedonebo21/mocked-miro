import { Link, href } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { rqClient } from "@/shared/api/instance.ts";
import { useQueryClient } from "@tanstack/react-query";

const BoardsListPage = () => {
  const queryClient = useQueryClient();

  const boardsQuery = rqClient.useQuery("get", "/boards");
  const createBoardMutation = rqClient.useMutation("post", "/boards", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/boards"),
      );
    },
  });
  const deleteBoardMutation = rqClient.useMutation(
    "delete",
    "/boards/{boardId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards"),
        );
      },
    },
  );

  const isCreating = createBoardMutation.isPending;
  return (
    <>
      <h1>Boards List</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          createBoardMutation.mutate({
            body: {
              name: formData.get("name") as string,
            },
          });
        }}
      >
        <input name={"name"} type="text" />
        <button type={"submit"} disabled={isCreating}>
          Create Board
        </button>
      </form>

      <div>
        {boardsQuery.data?.list.map((board) => {
          const handleBoardDelete = () => {
            deleteBoardMutation.mutate({
              params: { path: { boardId: board.id } },
            });
          };
          const isDeleting = deleteBoardMutation.isPending;
          return (
            <div key={board.id}>
              <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
                {board.name}
              </Link>
              <button disabled={isDeleting} onClick={handleBoardDelete}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export const Component = BoardsListPage;
