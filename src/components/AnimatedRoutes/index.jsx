import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home";
import TopRatedMovies from "../TopRatedMovies";
import UpcomingMovies from "../UpcomingMovies";
import MovieDetailsComponent from "../MovieDetailsComponent";
import { AnimatePresence } from "framer-motion";
import Login from "../Login";
import Cookies from "react-js-cookie"

let isAuthenticated;

const AnimatedRoutes = () => {
  return (
    <AnimatePresence>
        <Routes>
              <Route exact path = "/login" element = {<Login/>} />
              <Route path = "/" element = {<RequiredAuth redirectedTo="/login"><Home/></RequiredAuth>} />
              <Route exact path = "/topRatedMovies" element = {<RequiredAuth redirectedTo="/login"><TopRatedMovies/></RequiredAuth>} />
              <Route exact path = "/upcomingMovies" element = {<RequiredAuth redirectedTo="/login"><UpcomingMovies/></RequiredAuth>} />
              <Route exact path = "/movieDetailsPage/:id" element = {<RequiredAuth redirectedTo="/login"><MovieDetailsComponent/></RequiredAuth>} />
        </Routes>
    </AnimatePresence>
  )
}

function RequiredAuth({children , redirectedTo}) {
  const token = Cookies.get("jwtToken")
  return isAuthenticated = token === undefined ? <Navigate to = {redirectedTo} /> : children
}

export default AnimatedRoutes
