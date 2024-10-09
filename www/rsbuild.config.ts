import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass'

const { publicVars } = loadEnv()

export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
  source: {
    define: publicVars
  }
});
