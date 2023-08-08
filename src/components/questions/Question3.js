import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import spinner from "../assets/spinner-loading.gif"

const Question3 = (props) => {
  const navigate = useNavigate()
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state


  useEffect(() => {
    const spinnerDiv = document.getElementById("spinnerDiv")
    if (isLoading) {
      spinnerDiv.classList.remove("hidden")
      spinnerDiv.classList.add("flex")
    }
    else {
      spinnerDiv.classList.remove("flex")
      spinnerDiv.classList.add("hidden")
    }
  })


  const handleClick = () => {
    const chosenFormat = results.formats.filter((format) => {
      console.log(format)
      if (document.getElementById(format.url)?.checked) {
        return true
      }
      else {
        return false
      }
    })

    const downloadLink = chosenFormat[0].url
    const itag = chosenFormat[0].itag //integer
    const filename = `${results.title.slice(0, 15)}.. - YTLoader`

    console.log(downloadLink)
    console.log(filename)
    console.log(itag)

    //setting states..
    if ((Number.parseInt(chosenFormat[0].contentLength) / 1024 / 1024).toFixed(2) > 500) {
      console.log("toolarge")
      props.setIsTooLarge(true)
    }
    else {
      console.log("not too large")
      console.log((Number.parseInt(chosenFormat[0].contentLength) / 1024 / 1024).toFixed(2))
      props.setIsTooLarge(false)
    }

    if (document.getElementById("subs").checked) {
      props.setWantSubtitles(true)
    }
    else {
      props.setWantSubtitles(false)
    }
    props.setDownloadLink(downloadLink)
    props.setFilename(filename)
    props.setItag(itag)

    navigate("/download")
  }

  useEffect(() => {
    const getResults = async () => {
      if (!props.link){ //for a bug which occurs while pressing back btn from /download
        navigate("/")
      }

      const url = `${props.API_URL}/get_details?url=${props.link}`;
      console.log(url);
      try {

        const rawResp = await fetch(url);
        const resp = await rawResp.json();
        console.log(resp.details);
        return resp.details;
      } catch (error) {
        alert("Cannot fetch the URL.")
        window.location.reload()
      }
    };

    getResults().then((data) => {
      data = repack(data)
      setResults(data);
      console.log(data)
      setIsLoading(false); // Update isLoading state when results are received
    });
  }, []);

  const repack = (obj) => {
    console.log("hio")
    console.log(obj)
    // for format in obj.formats, if format.hasAudio and !format.hasVideo then keep it in obj, else remove it from the original obj
    if (props.type === "audio") {
      const newObj = {
        ...obj
        , formats: obj.formats.filter(format => format.hasAudio && !format.hasVideo)
      }
      return newObj
    }
    else if (props.type === "video") {
      const newObj = {
        ...obj
        , formats: obj.formats.filter(format => format.hasVideo && !format.hasAudio)
      }
      return newObj
    }
  }

  return (
    <div className="container flex items-center justify-center px-3">
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body text-center">
          <h2 className="card-title">Please choose the appropriate format</h2>
          <div className="form-control">
            {props.type !== "audio" && <label className="label cursor-pointer">
              <span className="label-text text-base-100 text-base">Download subtitles if available</span>
              <input id='subs' type="checkbox" className="checkbox border-base-100" />

            </label>}
          </div>
          <hr className='border-base-100 ' />
          {!isLoading && results.formats.length !== 0 &&


            results.formats.map((format) => {
             
              return (<div className="form-control">
                <label className="label cursor-pointer">
                  <span className="text-primary-content">{format.audioBitrate ? format.audioBitrate : format.qualityLabel}  {format.audioBitrate ? "kbps" : ""} ({format.codecs.split(".")[0]}) {format.audioTrack ? `(${format.audioTrack.displayName})` : ""} {format.contentLength ? `(${(Number.parseInt(format.contentLength) / 1024 / 1024).toFixed(2)} MB)` : ""}</span>
                  <input onChange={e => { }} id={format.url} type="radio" name="radio-10" className="radio bg-primary checked:bg-base-100 border-base-100" />
                </label>
              </div>)
            }
            )
          }

          <div id='spinnerDiv' className="hidden justify-center">
            <img src={spinner} alt="spinner" className='h-16 w-16' />
          </div>
          <div className="alert mt-4 mb-0 p-2 alert-warning shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>Make sure you have sufficient storage before downloading!</span>
            </div>
          </div>
          <div className="card-actions justify-end">

            <button onClick={handleClick} className="btn mt-5">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Question3
