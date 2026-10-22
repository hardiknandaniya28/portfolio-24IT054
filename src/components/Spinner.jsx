
function Spinner() {
    return (
        <div className="api-loading" role="status">
            <div className="spinner-circle"></div>
            <p>Loading your GitHub repositories...</p>
        </div>
    );
}

export default Spinner;
