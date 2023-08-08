import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import spinner from '../assets/spinner-loading.gif'
const GetLink = (props) => {
    const navigate = useNavigate()
    const [url, setUrl] = useState(null)
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state

    const handleFirstClick = () => {
        const spinnerDiv = document.getElementById("spinnerDiv")
        const linkInput = document.getElementById("link")
        spinnerDiv.classList.remove("hidden")
        spinnerDiv.classList.add("flex")
        linkInput.classList.add("hidden")

        const link = linkInput.value
        setUrl(link)
        getResults(link).then((data) => {
            console.log(data)
            if (!data) {
                window.location.reload();
                return
            }
            setResults(data);
            setIsLoading(false); // Update isLoading state when results are received
            spinnerDiv.classList.remove("flex")
            spinnerDiv.classList.add("hidden")

        });

    }
    const getResults = async (url) => {
        try {
            const link = `${props.API_URL}/get_details?url=${url}`;
            console.log(link);
            const rawResp = await fetch(link);

            console.log(rawResp.status)
            const resp = await rawResp.json();
            console.log(resp.details);
            return resp.details;
        } catch (error) {
            alert("Cannot fetch the URL.")
            return false
        }
    }
    const handleSecondClick = () => {
        console.log(url)

        props.setLink(url)
        navigate("/question-2")
    }
    return (
        <div className="container flex items-center justify-center px-3">
            <div className="card card-compact w-96 bg-primary text-primary-content">
                <div className="card-body  text-center">
                    {isLoading && (<>
                        <h2 className="card-title">Enter the link of the YouTube video</h2>
                        <input id='link' type="text" placeholder="Type here" className="input input-bordered border-base-300 focus:outline-base-300 bg-primary placeholder-base-100 placeholder-opacity-70 w-full max-w-xs" />
                        <div id='spinnerDiv' className="hidden justify-center">
                            <img src={spinner} alt="spinner" className='h-16 w-16' />
                        </div>
                        <div className="card-actions justify-end">
                            <button onClick={handleFirstClick} className="btn mt-5">Next </button>
                        </div>
                    </>)}
                    {!isLoading && results.formats.length !== 0 && (
                        <>

                            <div className="card-body pt-2">
                                <h2 className="card-title text-center mb-2">Is this okay?</h2>
                                <figure><img className='mt-2 mb-2 rounded-xl' src={results.thumbnail} alt="Video Thumbnail" ya /></figure>
                                <h2 className="card-title text-center text-base flex justify-between"><span className="font-bold">Title:</span> <span className='font-normal'>{results.title}</span> </h2>
                                <div className="divider text-primary-content my-0"></div>
                                <h2 className="card-title text-center text-base flex justify-between"><span className="font-bold">Uploaded By:</span> <span className='font-normal'>{results.channel}</span> </h2>
                            </div>
                            <div className="card-actions justify-end">
                                <button onClick={handleSecondClick} className="btn mt-5">Next </button>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}
export default GetLink
