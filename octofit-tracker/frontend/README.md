# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Environment configuration

The frontend expects a Codespaces environment variable named `VITE_CODESPACE_NAME` to be defined before it can build the correct API URLs for the backend. Create a local environment file such as `.env.local` in this folder and include:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

If this value is not set, the app falls back to a local backend URL instead of generating an invalid `https://undefined-8000...` address.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
