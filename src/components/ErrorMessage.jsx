function ErrorMessage({ message, onRetry, title = 'Unable to load tasks' }) {
    return (
        <div className="api-error" role="alert">
            <h3>{title}</h3>
            <p>{message}</p>

            <button type="button" onClick={onRetry}>
                Try Again
            </button>
        </div>
    );
}

export default ErrorMessage;
