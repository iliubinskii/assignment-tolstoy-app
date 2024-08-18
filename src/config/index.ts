import { cleanEnv, str } from "envalid";

export const { VITE_API_URL: API_URL } = cleanEnv(import.meta.env, {
  VITE_API_URL: str({ default: "http://localhost:3000" })
});
