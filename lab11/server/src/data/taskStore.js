// [CONCEPT: In-Memory Data Store]
// A simple array-based data layer with seed data.
// In production, this would be replaced with a database (e.g., PostgreSQL, MongoDB).

let tasks = [
  {
    id: 1,
    title: "Design system architecture",
    description: "Map out the frontend components and REST API endpoints.",
    category: "Planning",
    priority: "high", // 'low' | 'medium' | 'high'
    completed: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 2,
    title: "Build Express backend",
    description: "Implement middleware, CRUD routes, and centralized error handler.",
    category: "Backend",
    priority: "high",
    completed: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    title: "Build React frontend with Vite",
    description: "Create reusable components, wire up state, and integrate API.",
    category: "Frontend",
    priority: "medium",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: "Write documentation & run commands",
    description: "Provide quick start instructions and explain key concepts.",
    category: "Docs",
    priority: "low",
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

let nextId = 5;

export const taskStore = {
  // GET all tasks (optionally filtered)
  findAll: ({ search, status, priority, category } = {}) => {
    let result = [...tasks];

    // Filter by completion status
    if (status === "completed") {
      result = result.filter((t) => t.completed);
    } else if (status === "active") {
      result = result.filter((t) => !t.completed);
    }

    // Filter by priority
    if (priority && priority !== "all") {
      result = result.filter((t) => t.priority.toLowerCase() === priority.toLowerCase());
    }

    // Filter by category
    if (category && category !== "all") {
      result = result.filter((t) => t.category.toLowerCase() === category.toLowerCase());
    }

    // Search query across title and description
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q))
      );
    }

    return result;
  },

  // GET single task by ID
  findById: (id) => {
    return tasks.find((t) => t.id === Number(id)) || null;
  },

  // POST create task
  create: ({ title, description = "", category = "General", priority = "medium" }) => {
    const newTask = {
      id: nextId++,
      title: title.trim(),
      description: description.trim(),
      category: category.trim() || "General",
      priority: priority.toLowerCase(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    return newTask;
  },

  // PUT/PATCH update task
  update: (id, updates) => {
    const numericId = Number(id);
    const index = tasks.findIndex((t) => t.id === numericId);
    if (index === -1) return null;

    const existing = tasks[index];
    const updated = {
      ...existing,
      ...(updates.title !== undefined && { title: updates.title.trim() }),
      ...(updates.description !== undefined && { description: updates.description.trim() }),
      ...(updates.category !== undefined && { category: updates.category.trim() }),
      ...(updates.priority !== undefined && { priority: updates.priority.toLowerCase() }),
      ...(updates.completed !== undefined && { completed: Boolean(updates.completed) }),
      updatedAt: new Date().toISOString(),
    };

    tasks[index] = updated;
    return updated;
  },

  // DELETE task
  delete: (id) => {
    const numericId = Number(id);
    const index = tasks.findIndex((t) => t.id === numericId);
    if (index === -1) return false;

    tasks.splice(index, 1);
    return true;
  },
};

