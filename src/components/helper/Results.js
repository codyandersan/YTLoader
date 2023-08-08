import React, { useEffect, useState } from 'react';
import Card from './Card';
import spinner from "../assets/spinner-loading.gif"

const Results = (props) => {
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

    useEffect(() => {
        const getResults = async () => {
            props.setProgress(30)
            const url = `${props.API_URL}/search?query=${props.query}`;
            console.log(url);
            try {
                const rawResp = await fetch(url);
                props.setProgress(70)
                const resp = await rawResp.json();
                console.log(resp.results);
                return resp.results;

            } catch (error) {
                alert("Cannot fetch the URL.")
                window.location.reload()
            }
        };

        getResults().then((data) => {
            setResults(data);
            setIsLoading(false); // Update isLoading state when results are received
            props.setProgress(100)
        });
    }, []);

    return (
        <>
            <div id='spinnerDiv' className="flex mt-5 justify-center">
                <img src={spinner} alt="spinner" className='h-16 w-16' />
            </div>

            {!isLoading && results.length !== 0 && ( // Check isLoading state before rendering
                <div className="py-5 mx-3 md:mx-6">
                    <h1 className="my-1 font-semibold md:my-5 text-3xl md:text-4xl">
                        Results for {props.query}
                    </h1>

                    <div className="flex flex-col md:flex-row md:space-x-8 justify-center md:flex-wrap">
                        {results.map((result) => {
                            if (result.type === "video") {
                                return (
                                    <Card
                                        title={result.title}
                                        thumbnail={result.thumbnail.thumbnails.slice(-1)[0].url}
                                        url={"https://www.youtube.com/watch?v="+result.id}
                                        key={result.id}
                                        setLink={props.setLink}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default Results;
