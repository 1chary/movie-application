import { Link } from "react-router-dom"
import "./index.css"

const Header = () => (
    <div className="header-container">
        <Link to = "/">MovieDb</Link>
        <div>
            <Link to = "/popularMovies">Popular</Link>
            <Link to = "/topRatedMovies">Top Rated</Link>
            <Link to = "/upcomingMovies">Up Coming</Link>
            
        </div>
    </div>
)

export default Header