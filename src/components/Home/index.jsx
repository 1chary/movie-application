import {useState,useEffect } from "react";
import Header from "../Header";
import "./index.css"
import LoadingViewComponent from "../LoadingViewComponent"
import MovieCard from "../MovieCard";
import FailureViewComponent from "../FailureViewComponent";

const apiConstants = {
    'initial': "INITIAL",
    'success': "SUCCESS",
    'failure': "FAILURE",
    'loading': "LOADING"
}

const Home = () => {
    const [apiResponse,setApiResponse] = useState(apiConstants.initial)
    const [data,setData] = useState([])
    const [page,setPage] = useState(1)
    useEffect(() => {
        
        const fetchTheHomePageData = async () => {
            setApiResponse (
                apiConstants.loading
            )
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${'3ebbee02535b2c5e2a5646788e3b6384'}&language=en-US&page=${page}`)
            if (response.ok === true) {
                const responseData = await response.json()
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

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setPage(prev => prev + 1)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll",handleScroll)
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

    return (
    <>
        <Header />
        <div className="container">
            <div className="movie-container">
                {renderMoviePage()}
            </div>
        </div>
    </>
    )
}

export default Home