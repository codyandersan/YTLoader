import React, { useEffect, useState } from 'react'
import spinner from './assets/spinner-loading.gif'

import { useNavigate } from 'react-router-dom'

const Download = (props) => {
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state
    const [largeAudio, setLargeAudio] = useState(null)
    const [largeVideo, setLargeVideo] = useState(null)


    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/')

    }

    //Helper for getSubtitles
    const getFilenameFromResponse = (response) => {
        const contentDisposition = response.headers.get('Content-Disposition');
        if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(contentDisposition);
            if (matches != null && matches[1]) {
                return matches[1].replace(/['"]/g, '');
            }
        }
        return 'Subtitles - YTLoader.xml'; // Default filename if not found in the response
    }


    const downloadSubtitles = async () => {
        const link = `${props.API_URL}/download_subtitles?url=${props.link}`
        const raw_resp = await fetch(link);
        if (raw_resp.status !== 200) {
            return false
        }
        else {
            console.log(raw_resp.status)
            const response = await raw_resp.blob();
            const filename = getFilenameFromResponse(raw_resp);
            const url = window.URL.createObjectURL(response);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            return true

        }

    }


    const getAudioItag = async (url) => {
        try {


            const raw_resp = await fetch(`${props.API_URL}/get_details?url=${url}`);
            const response = await raw_resp.json();

            let maxAudioBitrate = 0;
            let formatWithMaxAudioBitrate = null;

            for (const format of response.details.formats) {
                if (format.hasAudio && !format.hasVideo) {
                    if (format.audioBitrate > maxAudioBitrate) {
                        maxAudioBitrate = format.audioBitrate;
                        formatWithMaxAudioBitrate = format;
                    }
                }
            }

            return formatWithMaxAudioBitrate.itag;
        } catch (error) {
            alert("Cannot fetch the URL.")
            window.location.reload();
        }
    }

    useEffect(() => {

        setIsLoading(false);
        if (!props.link) { //for a bug which occurs while pressing back btn from /download
            navigate("/")
        }
        const fetchData = async () => {
            if (props.wantSubtitles) {
                const success = await downloadSubtitles();
                console.log(success)

                if (!success) {
                    console.log("called")
                    document.getElementById('alert-div').classList.remove('hidden');
                    setTimeout(() => {
                        document.getElementById('alert-div').classList.add('hidden');
                    }, 2000);
                }
            }

            if (props.type === "audio") {
                const url = `${props.API_URL}/download_audio?audioUrl=${props.link}&audioItag=${props.itag}&filename=${props.filename}`;

                setIsLoading(false);
                window.location.href = url;
            }

            if (props.type === "video" && !props.isTooLarge) {
                console.log("this is running")
                const audioItag = await getAudioItag(props.link);
                console.log(audioItag);

                const url = `${props.API_URL}/download_video?videoUrl=${props.link}&videoItag=${props.itag}&audioItag=${audioItag}&filename=${props.filename}`;

                setIsLoading(false);
                console.log(url)
                window.location.href = url;
            }
            if (props.type === "video" && props.isTooLarge) {


                const audioItag = await getAudioItag(props.link);
                console.log(audioItag);

                const audioUrl = `${props.API_URL}/download_audio?audioUrl=${props.link}&audioItag=${audioItag}&filename=${props.filename}`;

                setLargeAudio(audioUrl)
                setLargeVideo(props.downloadLink)

                setIsLoading(false);


            }
            console.log(props.type);
            console.log(props.isTooLarge);
        }
        try {
            fetchData();
        } catch (error) {
            alert("Some error occured.")
            window.location.reload()

        }
    }, []);



    // const downloadFile = async () => {
    //     // downloadjs(props.downloadLink, "audio.mp3", "audio/mp3");
    //     await require("downloadjs")(props.downloadLink, "audio.mp3", "audio/mp3")
    //     setIsLoading(false);
    // };`
    return (
        <div className="container flex items-center justify-center px-3">
            <div className="card w-96  bg-primary text-primary-content">
                <div className="card-body text-center ">
                    {isLoading && <>
                        <h2 className="card-title">Processing download...</h2>
                        <div className="flex justify-center">

                            <img src={spinner} alt="spinner" className='h-16 w-16' />
                        </div>
                    </>}
                    {!isLoading &&
                        <>
                            {!props.isTooLarge &&
                                <>
                                    <h2 className="card-title justify-center">This might take a few minutes.</h2>
                                    <h2 className="card-title justify-center">If it shows some error, try reloading the page.</h2>
                                </>
                            }
                            {props.isTooLarge &&
                                <>
                                    <h2 className="card-title justify-center">:(</h2>
                                </>
                            }
                            <div className="my-2 alert alert-error hidden" id='alert-div'>
                                <span>No subtitles available!</span>


                            </div>
                            <div className="form-control">
                                <label className="label flex-col cursor-pointer justify-center">
                                    {props.isTooLarge &&
                                        <>
                                            Due to server limitations, you can't directly download videos larger than <b>500 MB.</b>
                                            Don't worry! you can download the audio and video streams and then play them using VLC. <a target="_blank" rel="noopener noreferrer" className='hover:text-base-200' href="https://www.bestforplayer.com/how-to-add-audio-to-video-in-vlc/">(See this guide)</a>
                                            <br />(Start by downloading the audio file, wait for it to finish, and then download the video.)
                                            {props.wantSubtitles && <a target="_blank" rel="noopener noreferrer" className=" mt-5 btn btn-outline text-base-200 hover:bg-base-100 hover:text-base-content btn-wide" href={props.downloadLink} download>Download Subtitles</a>}
                                            <a className="mt-5 btn btn-outline text-base-200 hover:bg-base-100 hover:text-base-content btn-wide" href={largeAudio}>Download Audio</a>
                                            <a className="mt-5 btn btn-outline text-base-200 hover:bg-base-100 hover:text-base-content btn-wide" target="_blank" rel="noopener noreferrer" href={largeVideo}>Download Video</a>
                                            <div className="alert alert-warning mt-4 mb-0 p-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                <span>After clicking Download Video, click on the Three Dot Menu &gt; Download</span>

                                            </div>

                                        </>}
                                    {!props.isTooLarge && <>Your download will start soon..</>}

                                </label>
                            </div>

                        </>}
                    <div className="card-actions justify-end">
                        <button onClick={handleClick} className="btn mt-5">Go to Home</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Download
