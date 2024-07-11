import { useParams } from 'react-router-dom'
import Header from '../Header'
import './index.css'
import { useEffect, useState } from 'react'
import DetailedViewComponent from '../DetailedViewComponent'
import LoadingViewComponent from '../LoadingViewComponent'
import FailureViewComponent from '../FailureViewComponent'


const MovieDetailsComponent = () => {
    const {id} = useParams()
    const [movieDetailsStorage, storeDetails] = useState([])
    const [showLoading,displayLoader] = useState(false)
    const [showFailure,displayFailure] = useState(false)

    useEffect(() => {
        const fetchMovieDetailsPageData = async () => {
            displayLoader(true)
            const tempStorage = []
            const fetchMovieDetails =  await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${'3ebbee02535b2c5e2a5646788e3b6384'}&language=en-US`)

            if (fetchMovieDetails.ok === true) {
                const jsonMovieDetailsData = await fetchMovieDetails.json()
                const convertIntoCamellCase = {
                    rating: jsonMovieDetailsData.vote_average,
                    id: jsonMovieDetailsData.id,
                    backdropPath: jsonMovieDetailsData.backdrop_path,
                    name: jsonMovieDetailsData.title,
                    imageUrl: jsonMovieDetailsData.poster_path,
                    runTime: jsonMovieDetailsData.runtime,
                    releaseDate: jsonMovieDetailsData.release_date,
                    overView: jsonMovieDetailsData.overview,
                    
                }
                tempStorage.push(convertIntoCamellCase)
                storeDetails([...movieDetailsStorage,...tempStorage])
                displayLoader(false)
            }
            else {
                displayLoader(false)
                displayFailure(true)
            }
            
        }
        fetchMovieDetailsPageData()
    },[])

    return (
        <>
            <Header />
            <div className="movie-page-container">
                {movieDetailsStorage.map((eachItem) => (
                    < DetailedViewComponent details = {eachItem} key = {eachItem.id}/>
                ))}
                {/*Will display the loader if the value is true*/}
            {showLoading && (
                < LoadingViewComponent />
            )}
            {/* Will display the failure view if the value is true*/}
            {showFailure && (
                < FailureViewComponent />
            )}
            </div>
        </>
    )
}

export default MovieDetailsComponent