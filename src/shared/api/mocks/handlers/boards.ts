import { ApiSchemas } from "@/shared/api/schema";
import { HttpResponse } from "msw";
import { http } from "../http";

function randomDate() {
  const start = new Date();
  start.setDate(start.getDate() - 30);

  const end = new Date();

  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  ).toISOString();
}
function generateBoardName() {
  const adjectives = [
    "Стратегический",
    "Креативный",
    "Инновационный",
    "Годовой",
    "Квартальный",
    "Важный",
    "Срочный",
    "Ключевой",
    "Долгосрочный",
    "Оперативный",
    "Тактический",
    "Аналитический",
    "Исследовательский",
  ];

  const nouns = [
    "План",
    "Проект",
    "Дизайн",
    "Отчет",
    "Анализ",
    "Концепт",
    "Процесс",
    "Прототип",
    "Обзор",
    "Презентация",
    "Маркетинг",
    "Разработка",
    "Бюджет",
    "Исследование",
    "Запуск",
    "Совещание",
  ];

  const themes = [
    "Продукта",
    "Команды",
    "Компании",
    "Кампании",
    "Стратегии",
    "Рынка",
    "Бренда",
    "Бизнеса",
    "Проекта",
    "Квартала",
    "Года",
    "Пользователя",
    "Клиента",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];

  return `${randomAdjective} ${randomNoun} ${randomTheme}`;
}
function generateRandomBoards(count: number): ApiSchemas["Board"][] {
  const result: ApiSchemas["Board"][] = [];

  for (let i = 0; i < count; i++) {
    const createdAt = randomDate();
    const updatedAt = new Date(
      Math.min(
        new Date(createdAt).getTime() + Math.random() * 86400000 * 10,
        new Date().getTime(),
      ),
    ).toISOString(); // Добавляем до 10 дней
    const lastOpenedAt = new Date(
      Math.min(
        new Date(updatedAt).getTime() + Math.random() * 86400000 * 5,
        new Date().getTime(),
      ),
    ).toISOString(); // Добавляем до 5 дней

    result.push({
      id: crypto.randomUUID(),
      name: generateBoardName(),
      createdAt,
      updatedAt,
      lastOpenedAt,
      isFavorite: Math.random() > 0.7, // Примерно 30% досок будут избранными
    });
  }

  return result;
}

const boards: ApiSchemas["Board"][] = generateRandomBoards(30);

export const boardsHandlers = [
  http.get("/boards", () => {
    return HttpResponse.json({
      list: boards,
      total: 30,
      totalPages: 10,
    });
  }),
  http.post("/boards", async (ctx) => {
    const data = await ctx.request.json();
    const now = new Date().toISOString();
    const board = {
      id: crypto.randomUUID(),
      name: data.name,
      createdAt: now,
      updatedAt: now,
      lastOpenedAt: now,
      isFavorite: false,
    };

    boards.push(board);
    return HttpResponse.json(board);
  }),

  http.delete("/boards/{boardId}", ({ params }) => {
    const { boardId } = params;

    const index = boards.findIndex((board) => board.id === boardId);

    if (index === -1) {
      return HttpResponse.json({
        message: "Board Not Found",
        code: "NOT_FOUND",
      });
    }

    boards.splice(index, 1);
    return HttpResponse.json({
      message: "Board Deleted",
      code: "OK",
    });
  }),
];
