/* eslint-disable import/no-extraneous-dependencies -- Ok */

import { defineConfig } from "vite";
import environment from "vite-plugin-environment";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [environment(["VITE_API_URL"]), react()]
});
