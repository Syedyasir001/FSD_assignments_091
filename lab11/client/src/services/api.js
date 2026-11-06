// [CONCEPT: API Service Layer]
// Encapsulates fetch requests to the Express backend with uniform error handling.

const BASE_URL = "/api/tasks";

// Helper to inspect HTTP status and extract JSON or error message
async function handleResponse(response) {
  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const errorMessage = data?.message || `Request failed with status ${response.status}`;
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  // GET all tasks with optional filters
  async getTasks(filters = {}) {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.status && filters.status !== "all") params.append("status", filters.status);
    if (filters.priority && filters.priority !== "all") params.append("priority", filters.priority);
    if (filters.category && filters.category !== "all") params.append("category", filters.category);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    const response = await fetch(`${BASE_URL}${queryString}`);
    return handleResponse(response);
  },

  // GET single task by ID
  async getTask(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    return handleResponse(response);
  },

  // POST create new task
  async createTask(taskData) {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    return handleResponse(response);
  },

  // PUT update existing task
  async updateTask(id, updates) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  },

  // PATCH toggle completion status
  async toggleTask(id) {
    const response = await fetch(`${BASE_URL}/${id}/toggle`, {
      method: "PATCH",
    });
    return handleResponse(response);
  },

  // DELETE remove task
  async deleteTask(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
};

