import { useState,useEffect } from "react"
import Header from "../Header"
import MovieCard from "../MovieCard"
import LoadingViewComponent from "../LoadingViewComponent"
import FailureViewComponent from "../FailureViewComponent"
import { FaArrowRight,FaArrowLeft } from "react-icons/fa";
import {motion} from "framer-motion"
const apiConstants = {
    'initial': "INITIAL",
    'success': "SUCCESS",
    'failure': "FAILURE",
    'loading': "LOADING"
}

const UpcomingMovies = () => {
    let [storeFetchedUpcomingData, storeUpcomingData] = useState([])
    const [apiResponse,setApiResponse] = useState(apiConstants.initial)
    const [page,setPage] = useState(1)

    useEffect(() => {
        const fetchTopRatingMoviesData = async () => {
            setApiResponse(apiConstants.loading)
            const fetchUpcomingMoviesData = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${'3ebbee02535b2c5e2a5646788e3b6384'}&language=en-US&page=${page}`)
            if (fetchUpcomingMoviesData.ok === true) {
                const upComingMoviesData = await fetchUpcomingMoviesData.json()
                storeFetchedUpcomingData = []
                const convertedUpcomingMoviesData = upComingMoviesData.results.map((eachItem) => ({
                    id: eachItem.id,
                    imagePath : eachItem.poster_path,
                    title: eachItem.title
                }))
                setApiResponse(apiConstants.success)
                storeUpcomingData([...storeFetchedUpcomingData, ...convertedUpcomingMoviesData])
                
            }
            else {
                setApiResponse(
                    apiConstants.failure
                )
            }
        
    }

    fetchTopRatingMoviesData()
    },[page])

    

    const renderLoadingView = () => {
        return <LoadingViewComponent />
    }

    const renderFailureView = () => {
        return <FailureViewComponent />
    }

    const renderSuccessView = () => {
        return (
            <>
            {storeFetchedUpcomingData.map((eachItem) => (
                < MovieCard key = {eachItem.id} movieDetails = {eachItem}/>
            ))}
            </>
        )
    }

    const renderUpcomingMoviesData = () => {
        switch (apiResponse) {
            case apiConstants.success:
                return renderSuccessView()
            case apiConstants.failure:
                return renderFailureView()
            case apiConstants.loading:
                return renderLoadingView()
            default:
                return null;
        }
    }

  return (
  <>
    < Header />
    <motion.div className="container">
        <div className="movie-container">
            {renderUpcomingMoviesData()}
            <div className="button-container">
                <button className="buttons" onClick={() => setPage(page-1)}>
                        <FaArrowLeft />
                </button>
                <button className="buttons" onClick={() => setPage(page+1)}>
                        <FaArrowRight/>
                </button>
            </div>
        </div>
    </motion.div>
    </>
  )
}

export default UpcomingMovies