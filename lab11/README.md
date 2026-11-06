# TaskFlow • Full-Stack Task Tracker

A beginner-readable full-stack web application built with a **React (Vite)** frontend and a **Node.js (Express)** REST API backend.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18+ (verified on v24)
- **npm**: v9+ (verified on v11)

### 2. Start the Backend Server (Express)
Open a terminal in the project root:
```bash
cd server
npm install
npm run dev
```
> The backend runs at: **`http://localhost:5000`**  
> Health check: `http://localhost:5000/api/health`

### 3. Start the Frontend Application (React + Vite)
Open a second terminal in the project root:
```bash
cd client
npm install
npm run dev
```
> The frontend runs at: **`http://localhost:5173`**  
> (API calls to `/api/*` are automatically proxied to port 5000 via Vite dev server)

---

## 📂 Project Structure

```text
fsdapp/
├── package.json                 # Root script runner for convenience
├── README.md                    # Project documentation & run guide
├── server/                      # Express Backend
│   ├── package.json
│   └── src/
│       ├── server.js            # Express setup (CORS, body-parser, logger, error handlers)
│       ├── routes/
│       │   └── tasks.js         # RESTful routes (GET, POST, PUT, PATCH, DELETE)
│       ├── middleware/
│       │   ├── logger.js        # Request logging middleware
│       │   ├── validation.js    # Payload validation middleware
│       │   └── errorHandler.js  # 404 and centralized error handlers
│       └── data/
│           └── taskStore.js     # In-memory storage with seed items & filters
└── client/                      # React Frontend (Vite)
    ├── package.json
    ├── vite.config.js           # Vite dev config with API proxy
    ├── index.html               # HTML entry point with modern typography
    └── src/
        ├── main.jsx             # React DOM root render
        ├── App.jsx              # Central state management (lifted state, handlers)
        ├── App.css              # Responsive styles, badges, toast notifications
        ├── services/
        │   └── api.js           # API service using fetch with status & error handling
        └── components/
            ├── Layout.jsx       # App shell, header, metrics counters
            ├── TaskFilter.jsx   # Search bar & filter controls (status, priority, category)
            ├── TaskForm.jsx     # Reusable create/edit task form with validation
            ├── TaskList.jsx     # List renderer with loading, error, and empty states
            └── TaskItem.jsx     # Individual task card with toggle, edit, and delete
```

---

## 🧭 Concepts Demonstrated in the Code

Every concept requested is clearly marked with inline comments throughout the codebase:

### 1. Component-Based Frontend
- **Reusable Small Components**:
  - `Layout.jsx`: Application shell, brand header, and live metric pills (`Total`, `Active`, `Done`).
  - `TaskFilter.jsx`: Search keyword input and filter dropdowns (Status, Priority, Category).
  - `TaskForm.jsx`: Dynamic form that adapts between **"Create Task"** and **"Edit Task"** mode.
  - `TaskList.jsx`: Handles conditional rendering for **Loading**, **Error**, **Empty**, and **Success** states.
  - `TaskItem.jsx`: Individual task card with priority badges, status toggle, edit, and delete buttons.
- **Props for Data Flow**: Tasks, filters, callback handlers (`onToggle`, `onEdit`, `onDelete`, `onFilterChange`) flow cleanly from parent to child.
- **State Management**:
  - `useState` for local component form inputs (`formData`, `validationError`).
  - Lifted state in `App.jsx` for tasks, filters, loading status, editing task reference, and toast alerts.
  - `useMemo` for derived metrics (`total`, `active`, `completed`).
- **Event Handling**: Controlled input `onChange`, form `onSubmit`, status checkbox toggle, button `onClick`, and delete confirmation.

### 2. RESTful Backend & HTTP Verbs
Implemented in `server/src/routes/tasks.js` with semantic HTTP status codes:

| Verb | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | List tasks (supports `?search=`, `?status=`, `?priority=`, `?category=`) | `200 OK` |
| **GET** | `/api/tasks/:id` | Retrieve a single task by ID | `200 OK` / `404 Not Found` |
| **POST** | `/api/tasks` | Create a new task (validated) | `201 Created` / `400 Bad Request` |
| **PUT** | `/api/tasks/:id` | Update an existing task | `200 OK` / `404 Not Found` |
| **PATCH**| `/api/tasks/:id/toggle` | Toggle task completion status | `200 OK` / `404 Not Found` |
| **DELETE**| `/api/tasks/:id` | Delete task by ID | `200 OK` / `404 Not Found` |

### 3. Middleware
- **JSON Body Parsing**: `express.json()` in `server/src/server.js` parses incoming JSON payloads.
- **CORS**: `cors()` enables cross-origin communication between the Vite frontend (`localhost:5173`) and Express (`localhost:5000`).
- **Request Logger**: `requestLogger` in `server/src/middleware/logger.js` logs method, URL, status code, and response time (e.g. `[TIMESTAMP] GET /api/tasks -> 200 (4ms)`).
- **Input Validation**: `validateTaskPayload` in `server/src/middleware/validation.js` checks required fields and allowed priorities before route handlers run, returning `400 Bad Request` with helpful error messages.
- **Centralized Error Handler**: `errorHandler` and `notFoundHandler` in `server/src/middleware/errorHandler.js` catch unhandled errors and undefined routes, returning consistent JSON responses.

### 4. Connecting Frontend to Backend
- **Service Layer**: `client/src/services/api.js` encapsulates `fetch()` requests and standardizes response parsing.
- **Loading & Error States**: `TaskList.jsx` renders an animated spinner when fetching and an error banner with a "Try Again" retry action if the API call fails.
- **Optimistic Updates**: Task status toggling updates the UI immediately for a snappy feel and syncs with the server response.

