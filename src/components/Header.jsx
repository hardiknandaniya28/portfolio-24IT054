
function Header({ name, themeColor }) {
    return (
        <header
            className="header"
            style={{ backgroundColor: themeColor }}
        >
            <div className="header-content">
                <div className="avatar">
                    {name.charAt(0).toUpperCase()}
                </div>

                <div>
                    <h1>{name}</h1>
                    <p>Student | Aspiring Web Developer</p>
                </div>
            </div>

            <p className="tagline">
                Learning, building, and creating with technology.
            </p>
        </header>
    );
}

export default Header;
