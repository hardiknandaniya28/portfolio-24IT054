const BASE_URL = 'http://localhost:5000';

export const getTasks = async () => {
    try {
        const res = await fetch(`${BASE_URL}/tasks`);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || `Failed to fetch tasks (${res.status})`);
        }
        return data;
    } catch (err) {
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
            throw new Error('Unable to connect to backend server. Is it running on http://localhost:5000?');
        }
        throw err;
    }
};

export const getTaskById = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/tasks/${id}`);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || `Failed to fetch task (${res.status})`);
        }
        return data;
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const resData = await res.json();
        if (!res.ok) {
            throw new Error(resData.error || `Failed to create task (${res.status})`);
        }
        return resData;
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const resData = await res.json();
        if (!res.ok) {
            throw new Error(resData.error || `Failed to update task (${res.status})`);
        }
        return resData;
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
            method: 'DELETE'
        });
        const resData = await res.json();
        if (!res.ok) {
            throw new Error(resData.error || `Failed to delete task (${res.status})`);
        }
        return resData;
    } catch (err) {
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
            throw new Error('Unable to connect to backend server. Is it running on http://localhost:5000?');
        }
        throw err;
    }
};

