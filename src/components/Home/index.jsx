import {useState,useEffect } from "react";
import Header from "../Header";
import "./index.css"

const Home = () => {
    const [storeFetchedData, storeData] = useState([])

    useEffect(() => {
        const fetchTheHomePageData = async () => {
            const newData = []
            const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=3ebbee02535b2c5e2a5646788e3b6384&language=en-US")
            const responseData = await response.json()
            const convertTheDataIntoCamelCase = responseData.results.map((eachItem) => ({
                id: eachItem.id,
                imageUrl: eachItem.backdrop_path,
                title: eachItem.title
            }))
            convertTheDataIntoCamelCase.forEach(element => {
                newData.push(element)
            });
            storeData([storeFetchedData, ...newData])
        }
    fetchTheHomePageData()
    },[])

    return (
    <>
        <Header />
        <div>
            <h1>Welcome to the home component</h1>
            {storeFetchedData.map((eachItem) => {
                <h1>{eachItem.title}</h1>
            })}  
        </div>
    </>
    )
}

export default Home