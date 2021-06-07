import path from 'path';
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'components': path.resolve(__dirname, 'src/app/components'),
      'utils': path.resolve(__dirname, 'src/app/utils')
    },
  },
  plugins: [reactRefresh()],
});
