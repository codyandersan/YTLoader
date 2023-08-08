import React from 'react'
import { useNavigate } from "react-router-dom";


const Question1 = () => {
  const navigate = useNavigate();
  
  const handleRedirect = () => {
    if (document.getElementById("byLink").checked) {
      navigate("/get-link");
    }
    else if (document.getElementById("bySearch").checked) {
      navigate("/search");
    }
  }

  return (
    <div className="container flex items-center justify-center px-3">
      <div className="card w-96   bg-primary text-primary-content">
        <div className="card-body text-center">
          <h2 className="card-title">How would you like to download?</h2>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="text-primary-content">By YouTube Link</span>
              <input onChange={e => { }} id="byLink" type="radio" name="radio-10" className="radio bg-primary checked:bg-base-100 border-base-100" checked />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="text-primary-content">By Search</span>
              <input onChange={e => { }} id="bySearch" type="radio" name="radio-10" className="radio bg-primary checked:bg-base-100 border-base-100" />
            </label>
          </div>
          <div className="card-actions justify-end">
            <button onClick={handleRedirect} className="btn mt-5">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Question1
