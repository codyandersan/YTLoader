import React from 'react'

const Searchbox = (props) => {

    const handleClick = () => {
        const query = document.getElementById("query").value
        console.log(query)
        props.setQuery(query)
    }

    return (
        <div className="container flex items-center justify-center px-3">
            <div className="card w-96   bg-primary text-primary-content">
                <div className="card-body text-center">
                    <h2 className="card-title">Enter the name of the YouTube video</h2>
                    <input type="text" id="query" placeholder="Type here" className="input input-bordered border-base-300 focus:outline-base-300 bg-primary placeholder-base-100 placeholder-opacity-70 w-full max-w-xs" />
                    <div className="card-actions justify-end">
                        <button onClick={handleClick} className="btn mt-5">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Searchbox
