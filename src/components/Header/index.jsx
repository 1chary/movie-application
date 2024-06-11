import { Link } from "react-router-dom"
import "./index.css"

const Header = () => (
    <div className="header-container">
        <Link to = "/">
            <button className="movie-image-button">
                <img src="https://www.i1.creditdonkey.com/image/1/550w/blue-diamond-1200x628.jpg" alt="theMovieDatabase" className="movie-db-image" />
            </button>
        </Link>
        <div>
            <Link to = "/popularMovies" ><button className="tab-styling">Popular</button></Link>
            <Link to = "/topRatedMovies">
            <button className="tab-styling">Top Rated</button>
            </Link>
            <Link to = "/upcomingMovies">
            <button className="tab-styling">Up Coming</ button>
            </Link>
            
        </div>
    </div>
)

export default Header