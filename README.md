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
https://api.github.com/users/hardiknandaniya28/repos

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


## Practical 6: Full Stack Integration (React + Node + Express + MongoDB)

### Overview
Connects the React client to the Node.js/Express and MongoDB Atlas backend. Replaces the external GitHub repository list with a full CRUD Task Management interface directly wired to the backend API (`http://localhost:5000/tasks`).

### Features
- **Centralized API**: Uses `src/api.js` for all HTTP requests to `http://localhost:5000`.
- **CORS Enabled**: Configured `cors` middleware on Express backend.
- **Full CRUD Support**:
  - `GET /tasks`: Loads tasks into state from MongoDB.
  - `POST /tasks`: Creates task with title, description, and priority.
  - `PUT /tasks/:id`: Toggles completion status and updates task fields.
  - `DELETE /tasks/:id`: Removes task with pre-delete confirmation dialog.
- **UI State Synchronization**: Reflects database state immediately on success; preserves data across page refreshes.
- **Supplementary Features**:
  - Browser confirmation dialog before task deletion.
  - Floating toast notifications for operation success/failure.
  - Real-time Pending & Done task statistics badges.
  - Comprehensive loading spinners and error handling with retry capability.

### How to Run Locally

1. **Start the Backend**:
   ```bash
   cd task-manager-api-24IT054
   npm start
   ```
2. **Start the Frontend**:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser and click **Tasks** in the navigation bar.
