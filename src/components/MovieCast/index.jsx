import { useEffect, useState } from "react"
import "./index.css"

const MovieCast = (props) => {
    const [movieCastDetails, uploadMovieCast] = useState([])
    const { movieId } = props

    useEffect(() => {
        const fetchCastDetails = async () => {
            const castDetails = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${'3ebbee02535b2c5e2a5646788e3b6384'}&language=en-US`)
            if (castDetails.ok === true) {
                const responseData = await castDetails.json()
                console.log(responseData)
                const convertTheCase = responseData.cast.map((eachItem) => ({
                    name: eachItem.name,
                    profile: eachItem.profile_path,
                    character: eachItem.character
                }))
                uploadMovieCast([...movieCastDetails ,...convertTheCase])   
            }
        }

        fetchCastDetails()
    },[])
    
    

    return (
        <div className="movie-cast-container">
            <h1 className="movie-cast-heading-style">Movie Cast</h1>
            <ul className="actor-container">
                {movieCastDetails.map((eachItem) => (
                    <li key = {eachItem.name} className="individual-actor-container">
                        {eachItem.profile !== null ? (<>
                            <img src = {`https://image.tmdb.org/t/p/original${eachItem.profile}`} className="cast-photo-style"/> 
                            <h1 className="actor-name-style">Name: {eachItem.name}</h1>
                            <p className="character-style">Character: {eachItem.character}</p>
                        </>) : ""}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MovieCast