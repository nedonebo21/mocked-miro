import { CONFIG } from "@/shared/model/config.ts";
import { createOpenApiHttp } from "openapi-msw";
import { ApiPaths } from "@/shared/api/schema";

export const http = createOpenApiHttp<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});
