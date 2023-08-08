import React from 'react'
import { Link } from 'react-router-dom'
import CarouselCard from './CarouselCard'
import img1 from "./assets/img1.jpeg"
import img2 from "./assets/img2.jpg"
import img3 from "./assets/img3.jpeg"
import img4 from "./assets/img4.jpeg"
import img5 from "./assets/img5.jpeg"
import img6 from "./assets/img6.jpeg"
import img7 from "./assets/img7.jpeg"

const Hero = () => {
    return (
        <div className="container flex w-screen ">
            <div className="hidden md:grid hero m-0 p-0 md:w-1/2">
                <div className="hero-content flex-col md:flex-row text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">YTLoader</h1>
                        <p className="py-6">Downlaod videos or songs from YouTube Adfree-ly.</p>
                        <Link to="/question-1" className="btn btn-primary">Try Out Now</Link>
                    </div>
                </div>
            </div>
            <div className="hero m-0 p-0 md:w-1/2 ">
                <div className="h-screen m-0 p-0 md:max-w-6xl  carousel carousel-vertical ">
                    <div className="carousel-item w-full h-full ">
                        <div className="hero" style={{ backgroundImage: `url(${img1})` }}>
                            <div className="hero-overlay bg-opacity-60"></div>
                            <div className="hero-content text-center text-neutral-content">

                                <div className="max-w-md md:hidden">
                                    <h1 className="mb-5 text-5xl font-bold">YTLoader</h1>
                                    <p className="mb-5">Download videos or songs from YouTube Adfree-ly.</p>
                                    <Link to="/question-1" className="btn btn-primary">Try Out Now</Link>
                                    <div class="flex flex-col items-center mt-16 ">
                                        <p class=" font-bold text-xl text-center">Scroll for features</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="animate-bounce mt-2 w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                        </svg>
                                    </div>


                                </div>
                                <div className="max-w-md hidden md:block">

                                    <div class="flex flex-col items-center ">
                                        <p class=" font-bold text-3xl text-center">Scroll for Features</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="mt-5 animate-bounce w-10 h-10">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                        </svg>
                                    </div>


                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="carousel-item h-full">
                        <CarouselCard image={img2}
                            title="It's Free!"
                            desc="Unleash the power of free video downloading! No need to spend a dime with YTLoader." />
                    </div>
                    <div className="carousel-item h-full">
                        <CarouselCard image={img3}
                            title="No Intrusive Ads!"
                            desc="Say goodbye to annoying ads and interruptions! YTLoader provides a seamless experience by eliminating all advertisements. Enjoy uninterrupted downloads and save your favorite videos without any distractions." />
                    </div>
                    <div className="carousel-item h-full">
                        <CarouselCard image={img6}
                            title="Separate Audio and Video Downloads"
                            desc="Get flexibility in your downloads with separate audio and video support! YTLoader allows you to download audio and video files separately. Seamlessly extract audio from your favorite videos or save the complete video file as per your preference." />
                    </div>
                    <div className="carousel-item h-full">
                        <CarouselCard image={img7}
                            title="No video link? No Problem!"
                            desc="Streamline your video downloads with direct search from YouTube! YTLoader lets you search for videos directly within the application." />
                    </div>
                    <div className="carousel-item h-full">
                        <CarouselCard image={img4}
                            title="Download in Stunning 4K!"
                            desc="Experience video quality like never before! YTLoader supports up to 4K video downloading, allowing you to enjoy your favorite content in stunning clarity. Capture every detail and relish the richness of high-resolution videos with ease. Download your favorite 4K videos now!" />
                    </div>


                    <div className="carousel-item h-full">
                        <CarouselCard image={img5}
                            title="Subtitles Support!"
                            desc="Enhance your video-watching experience with subtitles! YTLoader offers comprehensive subtitle support for videos. Enjoy your favorite content with subtitles and never miss a word. (currently only English subtitles are supported)" />
                    </div>

                    <div className="carousel-item w-full h-full ">
                        <div className="hero" style={{ backgroundImage: `url(${img1})` }}>
                            <div className="hero-overlay bg-opacity-60"></div>
                            <div className="hero-content text-center text-neutral-content">

                                <div className="max-w-md md:hidden">
                                    <h1 className="mb-5 text-4xl font-bold">Try out now!</h1>
                                    <Link to="/question-1" className="mt-5 btn btn-primary">Let's Go!</Link>
                                    


                                </div>
                                <div className="max-w-md hidden md:block">
                                    <h1 className="mb-5 text-5xl font-bold">Give it a try!</h1>
                                    <Link to="/question-1" className="mt-5 btn btn-primary">Let's Go!</Link>
                                    


                                </div>
                                
                            </div>
                        </div>

                    </div>

                </div>
            </div>






        </div>
    )
}

export default Hero
