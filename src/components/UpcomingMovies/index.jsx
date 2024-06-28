import { useState,useEffect } from "react"
import Header from "../Header"
import MovieCard from "../MovieCard"
import LoadingViewComponent from "../LoadingViewComponent"
import FailureViewComponent from "../FailureViewComponent"

const UpcomingMovies = () => {
    const [storeFetchedUpcomingData, storeUpcomingData] = useState([])
    const [showLoading,displayLoader] = useState(false)
    const [showFailure,displayFailure] = useState(false)

    useEffect(() => {
        const fetchTopRatingMoviesData = async () => {
            const upComingMovies = []
            for (let i = 1; i < 10; i++) {
            displayLoader(true)
            const fetchUpcomingMoviesData = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${'3ebbee02535b2c5e2a5646788e3b6384'}&language=en-US&page=${i}`)
            if (fetchUpcomingMoviesData.ok === true) {
                const upComingMoviesData = await fetchUpcomingMoviesData.json()
                const convertedUpcomingMoviesData = upComingMoviesData.results.map((eachItem) => ({
                    id: eachItem.id,
                    imagePath : eachItem.poster_path,
                    title: eachItem.title
                }))
                convertedUpcomingMoviesData.forEach((eachElement) => (
                    upComingMovies.push(eachElement)
                ))
                displayLoader(false)
                storeUpcomingData([...storeFetchedUpcomingData, ...upComingMovies])
                displayFailure(false)
            }
            else {
                displayLoader(false)
                displayFailure(true)
                break
            }
        }
    }

    fetchTopRatingMoviesData()
    },[])


  return (
  <>
    < Header />
    <div className="container">
        <div className="movie-container">
            {storeFetchedUpcomingData.map((eachItem) => (
                <MovieCard key = {eachItem.id} movieDetails = {eachItem} />
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
    </div>
    </>
  )
}

export default UpcomingMovies