import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// module federationajuda o app a expor modulos para outros consumirem ao msm tempo

export default defineConfig({
  plugins: [
    federation({
      name: "products",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductList": "./src/App.tsx",
      },
      shared: {
        react: {
          singleton: true, 
          requiredVersion: "^19.2.8",
        },
        "react/": {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.2.8",
        },
      },
      dts: false,
    }),
    react(),
  ],
  base: "http://localhost:3001/",

  server: {
    port: 3001,

    strictPort: true,

    origin: "http://localhost:3001",
  },
  build: {
    target: "chrome89",
  },
});
