import { useEffect } from "react";

import Header from "./components/Header";
import MainPage from "./pages/MainPage";

function App() {

  useEffect(() => {
    const selectedTheme = localStorage.getItem('theme')

    if(selectedTheme) {
      document.body.classList.add(selectedTheme)
    } else if(window.matchMedia("(prefers-color-scheme: dark)")) {
      document.body.classList.add("dark")
    }else{
      document.body.classList.add("light")
    }
  }, [])

  return (
    <>
      <Header/>
      <MainPage/>
    </>
  );
}

export default App;
