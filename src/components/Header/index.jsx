import { Link } from "react-router-dom"
import "./index.css"
import { useContext, useEffect } from "react"
import Context from "../../Context"
import { RxHamburgerMenu } from "react-icons/rx";
import {Popup} from "reactjs-popup"

const Header = () => {
    const [activeTab,changeActiveTab] = useContext(Context)

    useEffect(() => {
        const value = window.localStorage.getItem('active_tab');
        changeActiveTab(JSON.parse(value))
    },[])

    useEffect(() => {
        window.localStorage.setItem('active_tab', JSON.stringify(activeTab))
        console.log(activeTab)
    },[activeTab])

    const changeToHomeTab = () => {
        changeActiveTab('Home')
        
    }

    const changeToTopRatedTab = () => {
        changeActiveTab('Top Rated');
        
    }

    const changeToUpComingTab = () => {
        changeActiveTab("Up Coming")
    }



    return (
    <div className="header-container">
        <Link to = "/">
            <button className="movie-image-button" onClick={changeToHomeTab}>
                <img src="https://www.i1.creditdonkey.com/image/1/550w/blue-diamond-1200x628.jpg" alt="theMovieDatabase" className="movie-db-image" />
            </button>
        </Link>
        <div className="tabs-container-large-devices">
            <Link to = "/">
                <button className={`tab-styling ${activeTab === "Home" ? "active-tab" : "no-active-tab" }`} onClick={changeToHomeTab}>Home</button>
            </Link>
            <Link to = "/topRatedMovies">
            <button className= {`tab-styling ${activeTab === "Top Rated" ? "active-tab" : "no-active-tab" }`} onClick={changeToTopRatedTab}>Top Rated</button>
            </Link>
            <Link to = "/upcomingMovies">
            <button className= {`tab-styling ${activeTab === "Up Coming" ? "active-tab" : "no-active-tab" }`} onClick={changeToUpComingTab}>Up Coming</ button>
            </Link>
        </div>

        {/*.........For small and medium devices...........*/}
        <div className="tabs-for-mobile-applications">
            <div className="popup-container">
                <Popup
                    trigger={
                        <button className="hamburger-button">
                            <RxHamburgerMenu className="hamburger-icon"/>
                        </button>
                    }>

                <div className="pop-up-container">
                    <Link to = "/">
                        <button className={`tab-styling ${activeTab === "Home" ? "active-tab" : "no-active-tab" }`} onClick={changeToHomeTab}>Home</button>
                    </Link>
                    <Link to = "/topRatedMovies">
                        <button className= {`tab-styling ${activeTab === "Top Rated" ? "active-tab" : "no-active-tab" }`} onClick={changeToTopRatedTab}>Top Rated</button>
                    </Link>
                    <Link to = "/upcomingMovies">
                        <button className= {`tab-styling ${activeTab === "Up Coming" ? "active-tab" : "no-active-tab" }`} onClick={changeToUpComingTab}>Up Coming</ button>
                    </Link>
                </div>
            </Popup>
            </div>
        </div>
    </div>
    )
}
export default Header