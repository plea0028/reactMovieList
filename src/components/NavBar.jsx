import { Link } from "react-router-dom"; // imports navigation links
import "../css/Navbar.css" // the stylesheet for the navbar

function NavBar() { // navbar function
    return ( // HTML navbar component
        <nav className="navbar"> {/* nav element */}
            <div className="navbar-brand"> {/* div for left side title */}
                <Link to="/">Movie App</Link> {/* hyperlink to default page */}
            </div>
            <div className="navbar-links"> {/* div for right side links */}
                <Link to="/" className="nav-link">Home</Link> {/* hyperlink to home page */}
                <Link to="/favourites" className="nav-link">Favourites</Link> {/* hyperlink to favourites page */}
            </div>
        </nav>
    )
}

export default NavBar // default export for NavBar