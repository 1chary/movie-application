import {useState,useEffect } from "react";
import Header from "../Header";
import "./index.css"
import LoadingViewComponent from "../LoadingViewComponent"
import MovieCard from "../MovieCard";
import FailureViewComponent from "../FailureViewComponent";
import { FaArrowRight,FaArrowLeft } from "react-icons/fa";
import {motion} from "framer-motion"
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const apiConstants = {
    'initial': "INITIAL",
    'success': "SUCCESS",
    'failure': "FAILURE",
    'loading': "LOADING"
}

const Home = () => {
    const [apiResponse,setApiResponse] = useState(apiConstants.initial)
    let [data,setData] = useState([])
    const [page,setPage] = useState(1)
    useEffect(() => {
        
        const fetchTheHomePageData = async () => {
            setApiResponse (
                apiConstants.loading
            )
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${'3ebbee02535b2c5e2a5646788e3b6384'}&language=en-US&page=${page}`)
            if (response.ok === true) {
                const responseData = await response.json()
                data = []
                const convertedData = responseData.results.map((eachItem) => ({
                        id: eachItem.id,
                        imagePath : eachItem.poster_path,
                        title: eachItem.title
                }))
                setApiResponse(apiConstants.success)
                setData([...data,...convertedData])
                }
                else {
                    setApiResponse(
                        apiConstants.failure
                    )
                }
        }
    fetchTheHomePageData()
    },[page])


    const renderLoadingView = () => {
        return <LoadingViewComponent />
    }

    const renderSuccessView = () => {
        return (
            <>
            {data.map((eachItem) => (
                < MovieCard key = {eachItem.id} movieDetails = {eachItem}/>
            ))}
            </>
        )
    }

    const renderFailureView = () => {
        return <FailureViewComponent />
    }

    const renderMoviePage = () => {
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

    const pageDecreaseCount = () => {
        console.log(page)
        if (page < 1) {
            setPage(1)
        }
        else if (page > 1) {
            setPage(page - 1)
        }
    }

    const pageIncreaseCount = () => {
        console.log(page)
        if (page > 500) {
            setPage(500)
        }
        else {
            setPage(page + 1)
        }
    }

    const token = Cookies.get("jwtToken");
    if (token !== undefined) {
        return <Navigate to = "/login" />
    }
    return (
    <>
        <Header />
        <motion.div className="container" 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >
            <div className="movie-container">
                {renderMoviePage()}
                <div className="button-container">
                    <button className="buttons" onClick={pageDecreaseCount}>
                        <FaArrowLeft />
                    </button>
                    <button className="buttons" onClick={pageIncreaseCount}>
                        <FaArrowRight/>
                    </button>
                </div>
            </div>
        </motion.div>
    </>
    )
}

export default Home