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


## Practical 7: Authentication and Middleware Pipeline

### Overview
Integrates secure user authentication (registration & login) using bcrypt password hashing, JSON Web Tokens (JWT) with 1-hour expiration, and an Express middleware pipeline (`authMiddleware` and `validateTask`). Protects all task routes while maintaining a seamless React authentication experience with automatic 401 handling and client logout.

### Features
- **User Authentication**:
  - `POST /register`: Hashes passwords with `bcryptjs` (10 rounds) and creates user document in MongoDB.
  - `POST /login`: Verifies password hash using `bcrypt.compare` and issues a signed JWT token valid for 1 hour.
  - `GET /me`: Authenticated endpoint returning user profile (excluding password).
- **Middleware Pipeline**:
  - `authMiddleware.js`: Verifies `Authorization: Bearer <token>` and protects task routes.
  - `validateTask.js`: Enforces required non-empty titles and valid priorities before MongoDB operations.
- **Frontend Integration (`src/components/Auth.jsx`)**:
  - Clean card-based login and registration interface matching Practical 7 reference UI.
  - Stores JWT token in `localStorage`.
  - Automatic session expiration detection: redirects to login if any protected request returns 401.
  - **Log Out** button to securely clear the client token.

### Practical 8: Performance Optimization and Lazy Loading in React
- **Route-Based Code Splitting**: All pages (`Home`, `Dashboard`, `ProjectsPage`, `TasksPage`, `Contact`, `NotFound`) are loaded on-demand via `React.lazy()` and wrapped in `<Suspense>`.
- **Smooth Delayed Fallback UI**: Implemented `DelayedFallback.jsx` with a 300ms threshold to prevent flickering spinners on fast networks.
- **Heavy Third-Party Component Isolation**: `HeavyChart.jsx` (powered by `recharts`) is lazily loaded only on the `/dashboard` route, keeping the main bundle lean and clean.
- **Render Optimization**: Wrapped `TaskItem` in `React.memo` and stabilized CRUD handlers in `TaskManager` with `useCallback`, eliminating redundant re-renders of the task list.
- **Build & Profiling Evidence**: Detailed comparison metrics, chunk breakdowns, and profiling notes are preserved in `docs/practical8/comparison.md`.

### Practical 9: In-Memory Caching and Query Optimization (Backend)
- **node-cache Integration**: In-memory caching for `GET /tasks` and `GET /tasks/:id` with 60s TTL (`stdTTL: 60`).
- **User Scoped Keys**: `tasks_${req.user.id}` and `task_${id}_${userId}` ensuring strict data isolation across accounts.
- **Proactive Invalidation**: Writes (`POST`, `PUT`, `DELETE`) automatically evict corresponding cache entries via `invalidateTaskCache`.
- **Debug Counters**: `GET /debug/cache-stats` tracks cache hits and misses; response headers expose `X-Cache: HIT / MISS`.
- **Performance**: Response times drop from ~84 ms (MongoDB Atlas cloud query) to ~3 ms (in-memory RAM), achieving ~96% lower latency.

### Practical 10: Asynchronous Processing with Event-Driven Architecture (Backend)
- **Native EventEmitter**: Implemented `events.js` extending Node.js's built-in `EventEmitter` with zero external dependencies.
- **Decoupled Background Listeners**: `listeners.js` handles `task-created` (with simulated 2-second notification delay) and `task-deleted` events.
- **Immediate Response Timing**: `POST /tasks` responds immediately with 201 Created (~15 ms) and emits `task-created`, with background notification completing 2 seconds later in the Node.js event loop.
- **Safe Error Handling**: Dedicated `error` event listener safely catches notification errors without crashing the server or failing database transactions.

### Practical 11: Containerization with Docker and Docker Compose
- **Full-Stack Orchestration**: Orchestrates 3 services (`frontend`, `backend`, `mongodb`) inside an internal bridge network (`app-network`) with a single command: `docker compose up --build`.
- **Multi-Stage Frontend**: Builds React app with `node:18-alpine` and serves production bundle via lightweight `nginx:alpine` on port 5173 with SPA routing support.
- **Backend Service**: Containerized Node 18 Express API on port 5000, listening on `0.0.0.0`, with automatic MongoDB connection retry.
- **MongoDB & Persistent Volume**: Official `mongo:latest` image mapped to port 27017, backed by named volume `mongo-data` for data persistence across container restarts.

### Practical 12: CI/CD Pipeline with GitHub Actions
- **Continuous Integration Pipeline**: Automated GitHub Actions workflow (`.github/workflows/ci.yml`) triggered on pushes and pull requests to `main`.
- **Automated Testing**: Runs 9 comprehensive tests (`tests/tasks.test.js`) verifying validation, JWT authentication, `/health` endpoint, and task routes.
- **Pipeline Failure & Resolution**: Demonstrated deliberate assertion failure producing Red X status, corrected to produce Green checkmark.
- **Workflow Status Badge**: Track real-time build status directly from GitHub.

### Running the Application

#### Option A: Running via Docker Compose (Practical 11)
```bash
docker compose up --build
```
- Open `http://localhost:5173` in your browser.
- Stop with `docker compose down` (preserves MongoDB data in `mongo-data` volume).

#### Option B: Running Locally Outside Docker
1. **Backend**:
   ```powershell
   cd task-manager-api-24IT054
   npm start
   ```
2. **Frontend**:
   ```powershell
   npm run dev
   ```
3. Navigate to `http://localhost:5173/tasks` for authenticated task management, and `http://localhost:5173/dashboard` for performance-optimized analytics.
