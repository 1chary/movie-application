import { Route,Routes} from "react-router-dom";
import Context from "./Context";
import Home from "./components/Home";
import UpcomingMovies from "./components/UpcomingMovies";
import TopRatedMovies from "./components/TopRatedMovies";
import MovieDetailsComponent from "./components/MovieDetailsComponent";
import "./App.css"
import { useState,useEffect } from "react";

const App = () => {

  const [activeTab, changeActiveTab] = useState(() => {
    const storedValue = window.localStorage.getItem('active_tab')
    return storedValue ? JSON.parse(storedValue) : "Home"
  })

  useEffect(() => {
      window.localStorage.setItem('active_tab', JSON.stringify(activeTab))
  },[activeTab])

  console.log(activeTab)

  return (
  <Context.Provider value = {[activeTab,changeActiveTab]} >
    <Routes>
      <Route path = "/" element = {<Home />} />
      <Route exact path = "topRatedMovies" element = { <TopRatedMovies />} />
      <Route exact path = "/upcomingMovies" element = {<UpcomingMovies />} />
      <Route exact path = "/movieDetailsPage/:id" element = { <MovieDetailsComponent />} />
    </Routes>
  </Context.Provider>
  )
}

export default App