
function ErrorMessage({ message, onRetry }) {
    return (
        <div className="api-error" role="alert">
            <h3>Unable to load repositories</h3>
            <p>{message}</p>

            <button type="button" onClick={onRetry}>
                Try Again
            </button>
        </div>
    );
}

export default ErrorMessage;
