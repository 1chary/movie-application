
import Context from "./Context";

import "./App.css"
import { useState,useEffect } from "react";
import AnimatedRoutes from "./components/AnimatedRoutes";

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
      <AnimatedRoutes />
  </Context.Provider>
  )
}

export default App