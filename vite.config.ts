/* eslint-disable import/no-extraneous-dependencies -- Ok */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()]
});
