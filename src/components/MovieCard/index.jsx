import { Link } from "react-router-dom";
import "./index.css"

const MovieCard = (props) => {
    const { movieDetails } = props;

    return (
        <Link to = {`/movieDetailsPage/${movieDetails.id}`} className="link-element">
            <div className="movie-card-container">
                <img src = {`https://image.tmdb.org/t/p/original${movieDetails.imagePath}`} alt = {movieDetails.title}  className="poster-style"/>
                <h1 className="title-heading">{movieDetails.title}</h1>
            </div>
        </Link>
    )
}

export default MovieCard