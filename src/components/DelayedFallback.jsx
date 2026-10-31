import { useState, useEffect } from 'react';
import Spinner from './Spinner.jsx';

export default function DelayedFallback({ delay = 300, message = 'Loading page...' }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    if (!show) {
        return null;
    }

    return (
        <div className="route-loading-fallback" role="status" aria-live="polite">
            <Spinner message={message} />
        </div>
    );
}

