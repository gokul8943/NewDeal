import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],     // Adjust entry point if needed
  outDir: 'dist',             // Output directory
  format: ['cjs'],            // CommonJS format for Node.js
  target: 'node14',           // Target Node.js version
  sourcemap: true,            // Enable source maps for debugging
  clean: true,                // Clean output directory before each build
  dts: true,                  // Generate TypeScript declaration files
  minify: false,              // Disable minification
  splitting: false,           // No code splitting for backend
  shims: false,               // Disable built-in shims
  watch: process.env.NODE_ENV === 'development', // Watch mode in development
});
