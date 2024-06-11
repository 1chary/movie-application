import {useState,useEffect } from "react";
import Header from "../Header";

const Home = () => {
    const [storeFetchedData, storeData] = useState([])

    useEffect(() => {
        const fetchTheHomePageData = async () => {
            const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key={apiKey}&language=en-US&page=1")
            const responseData = await response.json()
            const convertTheDataIntoCamelCase = responseData.results.map((eachItem) => ({
                id: eachItem.id,
                imageUrl: eachItem.backdrop_path,
                title: eachItem.title
            }))
            convertTheDataIntoCamelCase.forEach(element => {
                storeData([...storeFetchedData,element])
            });
        }
    fetchTheHomePageData()
    },[])
    console.log(storeFetchedData)
    return (
    <>
        <Header />
        <div>
            <h1>Welcome to the home component</h1>
        </div>
    </>
    )
}

export default Home