import React from 'react'
import { useNavigate } from 'react-router-dom'

const Question2 = (props) => {
  const navigate = useNavigate()

  const handleClick = () => {
    const type = document.getElementById("audio").checked ? "audio" : "video"
    props.setType(type)
    navigate("/question-3")
  }
  return (
    <div className="container flex items-center justify-center px-3">
      <div className="card w-96   bg-primary text-primary-content">
        <div className="card-body text-center">
          <h2 className="card-title">Please choose the appropriate type</h2>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="text-primary-content">As Audio</span>
              <input onChange={e => { }} id="audio" type="radio" name="radio-10" className="radio bg-primary checked:bg-base-100 border-base-100" checked />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="text-primary-content">As Video</span>
              <input onChange={e => { }} id="video" type="radio" name="radio-10" className="radio bg-primary checked:bg-base-100 border-base-100" />
            </label>
          </div>

          <div className="card-actions justify-end">

            <button onClick={handleClick} className="btn mt-5">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Question2
