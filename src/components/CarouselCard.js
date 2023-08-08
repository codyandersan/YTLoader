import React from 'react'

const CarouselCard = (props) => {
    return (
        <div className="hero" style={{ backgroundImage: `url(${props.image})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content flex-col text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-3 md:mb-5 text-3xl md:text-4xl font-bold">{props.title}</h1>
                    <p className="mb-0 md:mb-5">{props.desc}</p>

                </div>
                <div class="flex flex-col items-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" class="animate-bounce w-10 h-10">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default CarouselCard
