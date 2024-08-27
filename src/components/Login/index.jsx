import { useState } from "react"
import Cookies from "js-cookie"
import FailureViewComponent from "../FailureViewComponent"
import "./index.css"
import { TypeAnimation } from 'react-type-animation';
import { useNavigate, Navigate } from "react-router-dom";


const Login =  () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const storeJwtToken = (token) => {
        Cookies.set("jwtToken", token, {expires: 30})
        navigate("/")
    }

    const checkUser = async (event) => {
        event.preventDefault()
        const api = "https://claw-backend-project.onrender.com/login"
        const details = {username,password}
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
        }
        const response = await fetch(api,options)
        if (response.ok === true) {
            const data = await response.json()
            storeJwtToken(data.jwtToken)
        }
        else {
            <FailureViewComponent/>
        }
    }

    const TypingText = () => {
        return (
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'World Of Movies.',
                3000, // wait 1s before replacing "Mice" with "Hamsters"
                'World Of Entertainment.',
                3000,
                "Log In To Explore More.",
                3000,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: '60px', display: 'inline-block', color: "blueviolet" }}
              repeat={Infinity}
            />
          );
    }

  return (
    <div className="login-container">
        <div className="content-container">
            <h1 className="main-heading">Welcome to the</h1>
            <TypingText />
        </div>
        <form onSubmit={checkUser} className="form-container" >
            <label className="label-element">Name</label>
            <input type = "text" className="input-box" onChange={(event) => setUsername(event.target.value)} placeholder="  Enter Your Name"/>
            <label className="label-element">Password</label>
            <input type = "password" className="input-box" onChange={(event) => setPassword(event.target.value)} placeholder="  Enter Your Password"/>
            <button type = "submit" className="submit-button">submit</button>
        </form>
    </div>
  )
}

export default Login
