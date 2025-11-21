import Aboutus from '@/components/about/aboutus/Aboutus'
import React from 'react'
import CompanyHistory from './CompanyHistory'
import Team from './Team'
import FounderMessage from './FounderMessage'
import Faculty from './Faculty'
import FAQ from './FAQ'
import Contact from './Contact'

const About = () => {
    return (
        <div>
            <Aboutus />
            <CompanyHistory />
            <Team />
            <FounderMessage />
            <Faculty />
            <FAQ/>
            <Contact/>
        </div>
    )
}

export default About