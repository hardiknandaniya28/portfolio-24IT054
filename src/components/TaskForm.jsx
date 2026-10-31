import { useState } from 'react';
import { createTask } from '../api';

export default function TaskForm({ onCreated, showToast }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        setError('');

        try {
            const task = await createTask({
                title: title.trim(),
                description: description.trim(),
                priority
            });

            if (task.error) {
                throw new Error(task.error);
            }

            onCreated(task);
            setTitle('');
            setDescription('');
            setPriority('medium');
            if (showToast) {
                showToast('Task created successfully', 'success');
            }
        } catch (err) {
            const errorMsg = err.message || 'Failed to create task';
            setError(errorMsg);
            if (showToast) {
                showToast(errorMsg, 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h2>NEW TASK</h2>
            <div className="form-row">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <div className="select-wrapper">
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        aria-label="Task priority"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <span className="arrow">▼</span>
                </div>
            </div>
            <div className="form-row">
                <input
                    type="text"
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !title.trim()}
                >
                    {loading ? 'Adding...' : 'Add'}
                </button>
            </div>
            {error && <p className="error">{error}</p>}
        </form>
    );
}

