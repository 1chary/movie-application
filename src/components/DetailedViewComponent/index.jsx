import "./index.css"
import MovieCast from '../MovieCast'

const DetailedViewComponent = (props) => {
    const {rating,imageUrl,backdropPath,name,runTime,releaseDate,overView,id} = props.details;
    const desiredDate = new Date (releaseDate)
    const date = desiredDate.getDate()
    const month = desiredDate.getMonth() + 1
    const year = desiredDate.getFullYear()

    return (
        <>
        <div className="movie-details-container">
            <div className="info-container">
                <div className="details-container">
                    < img src = {`https://image.tmdb.org/t/p/original${imageUrl}`} className="thumbnail-image"/>
                    <div className="vertical-holder">
                        <h1 className="title-style">{name}</h1>
                        <p className="rating-style">Rating: {rating}</p>
                        <p className="rating-style">{runTime} Min </p>
                        <p className="rating-style">Release Date: {`${date}/${month}/${year}`}</p>
                    </div>
                </div>
                <h1 className="title-style">Overview:</h1>
                <p className="rating-style">{overView}</p>
            </div>
            <div className="bg-container">
                <img src = {`https://image.tmdb.org/t/p/original${backdropPath}`} alt = "background-image" className="bg-image" />
            </div>
        </div>
        < MovieCast movieId = {id} />
        </>
    )

}

export default DetailedViewComponent