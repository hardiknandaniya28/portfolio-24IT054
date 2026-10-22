
import { useState } from 'react';

function Contact() {
    const [message, setMessage] = useState('');
    const [showHelp, setShowHelp] = useState(false);

    return (
        <main className="section">
            <h2>Contact Me</h2>

            <p>
                Have a project idea or question? Write a message below.
            </p>

            <form onSubmit={(event) => event.preventDefault()}>
                <label htmlFor="message">
                    Your message
                </label>

                <textarea
                    id="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Type your message here..."
                    rows={5}
                    maxLength={500}
                    style={{
                        display: 'block',
                        width: '100%',
                        maxWidth: '600px',
                        padding: '14px',
                        marginTop: '10px',
                        marginBottom: '12px',
                        border: '1px solid #e7c9ae',
                        borderRadius: '12px',
                        background: '#fffdf9',
                        color: '#29251f',
                        resize: 'vertical'
                    }}
                />

                <p>
                    Characters: {message.length}/500
                </p>

                <p>
                    <strong>Live preview:</strong>{' '}
                    {message || 'Your message will appear here.'}
                </p>

                <button type="button" onClick={() => setShowHelp(!showHelp)}>
                    {showHelp ? 'Hide help' : 'Show help'}
                </button>

                {showHelp && (
                    <p>
                        Enter your message in the box above.
                        Your text preview updates as you type.
                    </p>
                )}
            </form>
        </main>
    );
}

export default Contact;
