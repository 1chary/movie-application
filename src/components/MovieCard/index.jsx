import { Link } from "react-router-dom";
import "./index.css"
import {motion} from "framer-motion"
const MovieCard = (props) => {
    const { movieDetails } = props;

    return (
        <Link to = {`/movieDetailsPage/${movieDetails.id}`} className="link-element">
            <motion.div whileHover={{scale: 1.2}} className="movie-card-container"
            >
                <img src = {`https://image.tmdb.org/t/p/original${movieDetails.imagePath}`} alt = {movieDetails.title}  className="poster-style"/>
                <h1 className="title-heading">{movieDetails.title}</h1>
            </motion.div>
        </Link>
    )
}

export default MovieCard