# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Practical 3: API Integration and Data Rendering

### API Used
GitHub REST API:
https://api.github.com/users/YOUR_USERNAME/repos

### Features
- Fetches repositories using the Fetch API.
- Uses useEffect to load data when the Projects component mounts.
- Uses useState for repository data, loading, errors, and search.
- Displays a loading spinner and error messages.
- Includes retry functionality and repository search.
- Displays repository names, descriptions, URLs, and star counts.

### Run the Project
1. Run npm install.
2. Run npm run dev.
3. Open the local URL shown by Vite.
4. Navigate to the Projects page.
