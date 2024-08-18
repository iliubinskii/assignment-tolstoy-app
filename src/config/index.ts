import { cleanEnv, str } from "envalid";

export const { VITE_API_URL: API_URL } =
  // eslint-disable-next-line no-process-env -- Ok
  cleanEnv(process.env, {
    VITE_API_URL: str({ default: "http://localhost:3000" })
  });
