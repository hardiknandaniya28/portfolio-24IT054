import { useState, useEffect, useCallback } from 'react';
import { getTasks } from '../api';
import TaskForm from './TaskForm.jsx';
import TaskItem from './TaskItem.jsx';
import Toast from './Toast.jsx';
import Spinner from './Spinner.jsx';
import ErrorMessage from './ErrorMessage.jsx';

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState({ message: '', type: 'success' });

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type });
    }, []);

    const hideToast = useCallback(() => {
        setToast({ message: '', type: 'success' });
    }, []);

    const fetchTasksList = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getTasks();
            if (Array.isArray(data)) {
                setTasks(data);
            } else if (data.error) {
                throw new Error(data.error);
            } else {
                setTasks([]);
            }
        } catch (err) {
            const errMsg = err.message || 'Failed to load tasks from backend';
            setError(errMsg);
            showToast(errMsg, 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchTasksList();
    }, [fetchTasksList]);

    const handleCreated = (newTask) => {
        setTasks((prev) => [newTask, ...prev]);
    };

    const handleUpdated = (updatedTask) => {
        setTasks((prev) =>
            prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
        );
    };

    const handleDeleted = (id) => {
        setTasks((prev) => prev.filter((t) => t._id !== id));
    };

    const pendingCount = tasks.filter((t) => !t.completed).length;
    const doneCount = tasks.filter((t) => t.completed).length;

    return (
        <div className="task-manager-container">
            {toast.message && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            )}

            {/* Task Manager Header matching friend's reference */}
            <div className="task-manager-header">
                <h1 className="task-manager-title">Task Manager</h1>
                <div className="task-stats-badges">
                    <span className="badge-stat badge-pending">
                        {pendingCount} pending
                    </span>
                    <span className="badge-stat badge-done">
                        {doneCount} done
                    </span>
                </div>
            </div>

            {/* Form to create new task */}
            <div className="task-card-wrapper">
                <TaskForm onCreated={handleCreated} showToast={showToast} />
            </div>

            {/* All Tasks List Section */}
            <div className="task-list-section">
                <h3 className="all-tasks-label">
                    ALL TASKS ({tasks.length})
                </h3>

                {loading ? (
                    <Spinner />
                ) : error ? (
                    <ErrorMessage
                        message={error}
                        onRetry={fetchTasksList}
                    />
                ) : tasks.length === 0 ? (
                    <div className="empty-tasks-message">
                        <p>No tasks yet. Create your first task above!</p>
                    </div>
                ) : (
                    <div className="task-items-list">
                        {tasks.map((task) => (
                            <TaskItem
                                key={task._id}
                                task={task}
                                onUpdated={handleUpdated}
                                onDeleted={handleDeleted}
                                showToast={showToast}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

