import { useState,useEffect } from "react"
import Header from "../Header"
import MovieCard from "../MovieCard"
import LoadingViewComponent from "../LoadingViewComponent"
import FailureViewComponent from "../FailureViewComponent"

const UpcomingMovies = () => {
    const [storeFetchedUpcomingData, storeUpcomingData] = useState([])
    const [showLoading,displayLoader] = useState(false)
    const [showFailure,displayFailure] = useState(false)
    const [page,setPage] = useState(1)

    useEffect(() => {
        const fetchTopRatingMoviesData = async () => {
            const upComingMovies = []
            displayLoader(true)
            const fetchUpcomingMoviesData = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${'3ebbee02535b2c5e2a5646788e3b6384'}&language=en-US&page=${page}`)
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
            }
        
    }

    fetchTopRatingMoviesData()
    },[page])

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setPage(prev => prev + 1)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll",handleScroll)
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