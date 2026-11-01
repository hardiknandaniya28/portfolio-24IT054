const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper to handle 401 Unauthorized globally
const handleResponse = async (res, defaultMsg) => {
    let data;
    try {
        data = await res.json();
    } catch {
        data = {};
    }

    if (res.status === 401) {
        localStorage.removeItem('token');
        throw new Error(data.error || 'Session expired or unauthorized. Please log in.');
    }

    if (!res.ok) {
        throw new Error(data.error || `${defaultMsg} (${res.status})`);
    }

    return data;
};

// ==========================================
// Authentication API Calls (Practical 7)
// ==========================================

export const registerUser = async (credentials) => {
    try {
        const res = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        return await handleResponse(res, 'Registration failed');
    } catch (err) {
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
            throw new Error('Unable to connect to backend server. Is it running on http://localhost:5000?');
        }
        throw err;
    }
};

export const loginUser = async (credentials) => {
    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        return await handleResponse(res, 'Login failed');
    } catch (err) {
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
            throw new Error('Unable to connect to backend server. Is it running on http://localhost:5000?');
        }
        throw err;
    }
};

export const getCurrentUser = async () => {
    try {
        const res = await fetch(`${BASE_URL}/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            }
        });
        return await handleResponse(res, 'Failed to fetch user profile');
    } catch (err) {
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
            throw new Error('Unable to connect to backend server. Is it running on http://localhost:5000?');
        }
        throw err;
    }
};

// ==========================================
// Protected Task CRUD API Calls (Practicals 6 & 7)
// ==========================================

export const getTasks = async () => {
    try {
        const res = await fetch(`${BASE_URL}/tasks`, {
            headers: {
                ...getAuthHeader()
            }
        });
        return await handleResponse(res, 'Failed to fetch tasks');
    } catch (err) {
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
            throw new Error('Unable to connect to backend server. Is it running on http://localhost:5000?');
        }
        throw err;
    }
};

export const getTaskById = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/tasks/${id}`, {
            headers: {
                ...getAuthHeader()
            }
        });
        return await handleResponse(res, 'Failed to fetch task');
    } catch (err) {
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
            throw new Error('Unable to connect to backend server. Is it running on http://localhost:5000?');
        }
        throw err;
    }
};

export const createTask = async (data) => {
    try {
        const res = await fetch(`${BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify(data)
        });
        return await handleResponse(res, 'Failed to create task');
    } catch (err) {
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
            throw new Error('Unable to connect to backend server. Is it running on http://localhost:5000?');
        }
        throw err;
    }
};

export const updateTask = async (id, data) => {
    try {
        const res = await fetch(`${BASE_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify(data)
        });
        return await handleResponse(res, 'Failed to update task');
    } catch (err) {
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
            throw new Error('Unable to connect to backend server. Is it running on http://localhost:5000?');
        }
        throw err;
    }
};

export const deleteTask = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                ...getAuthHeader()
            }
        });
        return await handleResponse(res, 'Failed to delete task');
    } catch (err) {
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
            throw new Error('Unable to connect to backend server. Is it running on http://localhost:5000?');
        }
        throw err;
    }
};

// ==========================================
// AI Integration API Calls (Practical 13)
// ==========================================

export const generateTaskDescription = async (title) => {
    try {
        const res = await fetch(`${BASE_URL}/api/ai/generate-description`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify({ title })
        });
        return await handleResponse(res, 'Failed to generate description');
    } catch (err) {
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
            throw new Error('Unable to connect to backend server. Is it running on http://localhost:5000?');
        }
        throw err;
    }
};
