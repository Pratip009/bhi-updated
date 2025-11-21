import React from 'react'
import Hero from './hero/Hero'
import About from './about/About'
import Course from './course/Course'
import Feature from './features/Feature'
import Review from './review/Review'
import Article from './article/Article'

const Home = () => {
  return (
    <div className=''>
      <Hero />
      <About />
      <Course />
      <Feature/>
      <Review/>
      <Article/>
    </div>
  )
}

export default Home