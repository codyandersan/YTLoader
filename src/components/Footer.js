import React from 'react'
import github_light from "./assets/github-light.png"
import github_dark from "./assets/github-dark.png"
const Footer = () => {
    return (
        <footer className="footer mt-5 flex flex-row justify-between  items-center p-4 ">
            <div >
                <hr className='border-1 w-full border-base-content '/>
                <p>Built with &#9829; by <a className='hover:text-accent' target='_blank' rel='noopener noreferrer' href="https://codyandersan.github.io/">@codyandersan</a> </p>
            </div>
            
        </footer>
    )
}

export default Footer
