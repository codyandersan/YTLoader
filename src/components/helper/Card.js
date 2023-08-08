import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = (props) => {
    const navigate = useNavigate()

    const handleClick = () => {
        props.setLink(props.url)
        navigate('/question-2')
    }
    return (

        <div onClick={handleClick} className="cursor-pointer hover:bg-primary-focus card mx-2 md:w-1/5 bg-primary text-primary-content shadow-xl my-5">
            <figure><img src={props.thumbnail} alt="thumbnail" /></figure>
            <div className="card-body pt-2">
                <h2 className="card-title  text-center text-base">{props.title}</h2>
            </div>
        </div>
    )
}

export default Card
