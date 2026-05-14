import React from 'react'
import HeroContent from './HeroContent'
import HeroImage from './HeroImage'
import ParticlesBackground from '../../helper/ParticlesBackground'
const Hero = () => {
    return (
        <div className="relative w-full h-screen pt-[4vh] md:pt-[12vh] bg-indigo-950">

            {/* PARTICLES - now on top but behind content */}
            <div className="absolute inset-0 pointer-events-none">
                <ParticlesBackground />
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 flex justify-center flex-col w-4/5 h-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                    <HeroContent />
                    <HeroImage />
                </div>
            </div>
        </div>
    )
}

export default Hero
