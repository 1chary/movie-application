import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import TopRatedMovies from "../TopRatedMovies";
import UpcomingMovies from "../UpcomingMovies";
import MovieDetailsComponent from "../MovieDetailsComponent";
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  return (
    <AnimatePresence>
        <Routes>
            <Route path = "/" element = {<Home />} />
            <Route exact path = "topRatedMovies" element = { <TopRatedMovies />} />
            <Route exact path = "/upcomingMovies" element = {<UpcomingMovies />} />
            <Route exact path = "/movieDetailsPage/:id" element = { <MovieDetailsComponent />} />
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
