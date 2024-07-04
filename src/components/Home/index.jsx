import {useState,useEffect } from "react";
import Header from "../Header";
import "./index.css"
import LoadingViewComponent from "../LoadingViewComponent"
import MovieCard from "../MovieCard";
import FailureViewComponent from "../FailureViewComponent";

const Home = () => {
    const [storeFetchedData, storeData] = useState([])
    const [showLoading,displayLoader] = useState(false)
    const [showFailure,displayFailure] = useState(false)
    useEffect(() => {
        const fetchTheHomePageData = async () => {
            const newData = []
            for (let i = 1; i < 10; i++) {
                displayLoader(true)
                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${'3ebbee02535b2c5e2a5646788e3b6384'}&language=en-US&page=${i}`)
                if (response.ok === true) {
                    const responseData = await response.json()

                    const convertedData = responseData.results.map((eachItem) => ({
                        id: eachItem.id,
                        imagePath : eachItem.poster_path,
                        title: eachItem.title
                    }))
                    convertedData.forEach(element => {
                        newData.push(element)
                    });
                    storeData([...storeFetchedData,...newData])
                    displayLoader(false)
                    displayFailure(false)
                }
                else {
                    displayFailure(true)
                    break
                }
            }
        }
    fetchTheHomePageData()
    },[])


    return (
    <>
        <Header />
        <div className="container">
            <div className="movie-container">
            {/* Will display the movie cards if the api is success*/ }
            {storeFetchedData.map((eachItem) => (
                < MovieCard key = {eachItem.id} movieDetails = {eachItem}/>
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

export default Home