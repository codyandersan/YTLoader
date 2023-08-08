import React, { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Question1 from './components/questions/Question1'
import Question2 from './components/questions/Question2'
import Question3 from './components/questions/Question3'
import GetLink from './components/helper/GetLink'
import Search from './components/helper/Search'
import Download from './components/Download'

export default function App() {
  //Don't add / after the URL here..!

  // const API_URL = "https://ytloader-backend-production.up.railway.app"
  const API_URL = "https://ytloader-backend.onrender.com"
  // const API_URL = "http://localhost:8080"

  const [link, setLink] = useState(null)
  const [downloadLink, setDownloadLink] = useState(null)
  const [type, setType] = useState(null)
  const [filename, setFilename] = useState(null)
  const [itag, setItag] = useState(null)
  const [isTooLarge, setIsTooLarge] = useState(false)
  const [wantSubtitles, setWantSubtitles] = useState(true) //set it false

  const toggleTheme = () => {
    const currentTheme = document.body.getAttribute("data-theme")
    if (currentTheme === "night") {
      document.body.setAttribute("data-theme", "emerald")
    }
    else {
      document.body.setAttribute("data-theme", "night")
    }
  }

  const [progress, setProgress] = useState(0) //progress of loading bar
  return (
    <>
      <LoadingBar
        color='#ff0000'
        progress={progress}
        height={3}
        shadow={false}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className='flex flex-col min-h-[100vh] justify-between	w-full'>
        <NavBar toggleTheme={toggleTheme} />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/question-1" element={<Question1 />} />
            <Route path="/get-link" element={<GetLink setLink={setLink} API_URL={API_URL} />} />
            <Route path="/search" element={<Search setProgress={setProgress} setLink={setLink} API_URL={API_URL} />} />

            <Route path="/question-2" element={<Question2 setType={setType} />} />

            <Route path="/question-3" element={<Question3 type={type} link={link} API_URL={API_URL} setDownloadLink={setDownloadLink} setIsTooLarge={setIsTooLarge} setFilename={setFilename} setItag={setItag} setWantSubtitles={setWantSubtitles} />} />

            <Route path="/download" element={<Download downloadLink={downloadLink} link={link} API_URL={API_URL} itag={itag} type={type} isTooLarge={isTooLarge} filename={filename} setProgress={setProgress} wantSubtitles={wantSubtitles} />} />

          </Routes>


        </HashRouter>
        <Footer />
      </div >
    </>
  )
}