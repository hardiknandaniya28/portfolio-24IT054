import { useState, memo } from 'react';
import { updateTask, deleteTask } from '../api';

function TaskItem({ task, onUpdated, onDeleted, showToast }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description || '');
    const [editPriority, setEditPriority] = useState(task.priority || 'medium');
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // Toggle completed checkbox
    const handleToggleComplete = async () => {
        if (updating) return;
        setUpdating(true);
        try {
            const updated = await updateTask(task._id, {
                completed: !task.completed
            });
            onUpdated(updated);
            if (showToast) {
                showToast(
                    updated.completed
                        ? 'Task marked as completed'
                        : 'Task marked as pending',
                    'success'
                );
            }
        } catch (err) {
            if (showToast) {
                showToast(err.message || 'Failed to update task', 'error');
            }
        } finally {
            setUpdating(false);
        }
    };

    // Save edited task
    const handleSaveEdit = async (e) => {
        e.preventDefault();
        if (!editTitle.trim() || updating) return;

        setUpdating(true);
        try {
            const updated = await updateTask(task._id, {
                title: editTitle.trim(),
                description: editDescription.trim(),
                priority: editPriority
            });
            onUpdated(updated);
            setIsEditing(false);
            if (showToast) {
                showToast('Task updated successfully', 'success');
            }
        } catch (err) {
            if (showToast) {
                showToast(err.message || 'Failed to update task', 'error');
            }
        } finally {
            setUpdating(false);
        }
    };

    // Cancel edit
    const handleCancelEdit = () => {
        setEditTitle(task.title);
        setEditDescription(task.description || '');
        setEditPriority(task.priority || 'medium');
        setIsEditing(false);
    };

    // Delete with confirmation dialog (Supplementary requirement A)
    const handleDelete = async () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete the task: "${task.title}"?`
        );
        if (!confirmed) return;

        setDeleting(true);
        try {
            await deleteTask(task._id);
            onDeleted(task._id);
            if (showToast) {
                showToast('Task deleted successfully', 'success');
            }
        } catch (err) {
            if (showToast) {
                showToast(err.message || 'Failed to delete task', 'error');
            }
            setDeleting(false);
        }
    };

    const priorityClass = `priority-${(task.priority || 'medium').toLowerCase()}`;

    if (isEditing) {
        return (
            <div className="task-item task-item-editing">
                <form onSubmit={handleSaveEdit} className="task-edit-form">
                    <div className="edit-row">
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Task title"
                            required
                            className="edit-input-title"
                        />
                        <select
                            value={editPriority}
                            onChange={(e) => setEditPriority(e.target.value)}
                            className="edit-select-priority"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="edit-row">
                        <input
                            type="text"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Description"
                            className="edit-input-desc"
                        />
                        <div className="edit-actions">
                            <button
                                type="submit"
                                className="btn btn-save"
                                disabled={updating || !editTitle.trim()}
                            >
                                {updating ? 'Saving...' : 'Save'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-cancel"
                                onClick={handleCancelEdit}
                                disabled={updating}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className={`task-item ${task.completed ? 'task-completed' : ''}`}>
            <div className="task-left">
                <input
                    type="checkbox"
                    checked={Boolean(task.completed)}
                    onChange={handleToggleComplete}
                    disabled={updating || deleting}
                    className="task-checkbox"
                    aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
                />
                <div className="task-text-group">
                    <span className="task-title">{task.title}</span>
                    {task.description && (
                        <span className="task-description">{task.description}</span>
                    )}
                </div>
            </div>

            <div className="task-right">
                <span className={`badge-priority ${priorityClass}`}>
                    {(task.priority || 'medium').toUpperCase()}
                </span>
                <button
                    type="button"
                    className="btn btn-edit"
                    onClick={() => setIsEditing(true)}
                    disabled={updating || deleting}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="btn btn-delete"
                    onClick={handleDelete}
                    disabled={deleting || updating}
                >
                    {deleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
}

export default memo(TaskItem);

