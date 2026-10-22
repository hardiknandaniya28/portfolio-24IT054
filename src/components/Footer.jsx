
function Footer({ email }) {
    return (
        <footer id="contact" className="footer">
            <h2>Contact</h2>

            <p>
                Email: <a href={`mailto:${email}`}>{email}</a>
            </p>

            <p>
                © {new Date().getFullYear()} My Portfolio
            </p>
        </footer>
    );
}

export default Footer;
