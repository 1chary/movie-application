import { Route,Routes} from "react-router-dom";
import Home from "./components/Home";
import UpcomingMovies from "./components/UpcomingMovies";
import PopularMovies from "./components/PopularMovies";
import TopRatedMovies from "./components/TopRatedMovies";
import "./App.css"

const App = () => (
  <Routes>
    <Route path = "/" element = {<Home />} />
    <Route exact path = "/popularMovies" element = { <PopularMovies />} />
    <Route exact path = "topRatedMovies" element = { <TopRatedMovies />} />
    <Route exact path = "/upcomingMovies" element = {<UpcomingMovies />} />
    
  </Routes>
) 

export default App