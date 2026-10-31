function Spinner({ message = 'Loading tasks...' }) {
    return (
        <div className="api-loading" role="status">
            <div className="spinner-circle"></div>
            <p>{message}</p>
        </div>
    );
}

export default Spinner;
