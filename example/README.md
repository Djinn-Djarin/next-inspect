# @djarin/next-inspect Interactive Demo

<a href="https://github.com/Djinn-Djarin/next-inspect"><img src="https://img.shields.io/badge/GitHub-Repository-181717?logo=github&style=for-the-badge" alt="GitHub Repository"/></a>

This is the official interactive demo for [`@djarin/next-inspect`](https://www.npmjs.com/package/@djarin/next-inspect) — a zero-code, pluggable request and console log inspector for Next.js.

## Getting Started

First, install the dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to test the logger

The home page features 4 buttons designed to trigger different types of network activity across the stack:
1. **GET /api/hello**: Triggers a local same-origin API route and executes a server-side `console.log`.
2. **POST /api/hello**: Sends a JSON request body and receives a JSON response.
3. **Weather API (External)**: Makes a direct, cross-origin browser `fetch` call to a public weather API. Note: We explicitly enabled `options={{ logExternal: true }}` in `components/log-inspector.tsx` to capture this!
4. **Trigger 404 Error**: Intentionally requests a missing API route to demonstrate how the logger beautifully formats failing status codes and intercepts raw error strings.

Click any of the buttons and watch the floating terminal in the bottom corner instantly pipe in the logs with durations, status codes, and the originating file/line number!

## How it's configured

This demo implements the library using best practices:
- **`next.config.mjs`**: Wraps the config in `withLogInspector()` and enables `experimental: { instrumentationHook: true }` (required for Next 14).
- **`components/log-inspector.tsx`**: Creates the `use client` component wrapper using `next/dynamic` to avoid SSR hydration issues.
- **`app/layout.tsx`**: Mounts the inspector globally so it captures activity across all routes.
