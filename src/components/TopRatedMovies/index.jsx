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

const TopRatedMovies = () => {
    let [storeFetchedTopRatedData, storeTopRatedData] = useState([])
    const [apiResponse,setApiResponse] = useState(apiConstants.initial)
    const [page,setPage] = useState(1)

    useEffect(() => {
        const fetchTopRatingMoviesData = async () => {
            setApiResponse(apiConstants.loading)
            const fetchTopRatedMoviesData = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${'3ebbee02535b2c5e2a5646788e3b6384'}&language=en-US&page=${page}`)
            if (fetchTopRatedMoviesData.ok === true) {
                const responseTopRatedData = await fetchTopRatedMoviesData.json()
                storeFetchedTopRatedData = []
                const convertedTopRatedData = responseTopRatedData.results.map((eachItem) => ({
                    id: eachItem.id,
                    imagePath : eachItem.poster_path,
                    title: eachItem.title
                }))
                setApiResponse(apiConstants.success)
                storeTopRatedData([...storeFetchedTopRatedData, ...convertedTopRatedData])
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
            {storeFetchedTopRatedData.map((eachItem) => (
                < MovieCard key = {eachItem.id} movieDetails = {eachItem}/>
            ))}
            </>
        )
    }

    const renderTopRatedMoviePage = () => {
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
            {renderTopRatedMoviePage()}
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

export default TopRatedMovies