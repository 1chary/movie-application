import { Link } from "react-router-dom"
import "./index.css"

const Header = () => (
    <div className="header-container">
        <Link to = "/">MovieDb</Link>
        <div>
            <Link to = "/popular">Popular</Link>
            <Link to = "/upComing">Up Coming</Link>
            <Link to = "/topRated">Top Rated</Link>
        </div>
    </div>
)

export default Header