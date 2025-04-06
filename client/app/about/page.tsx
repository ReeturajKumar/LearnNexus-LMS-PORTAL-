'use client'
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import About from './About'
import Footer from '../components/Footer/Footer'

type Props = {}

const Page = (props: Props) => {

    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(2);
  return (
    <div>
      <Heading
       title={"About - LearnNexus"}
       description={"LearnNexus is a platform that provides a wide range of courses and resources for learning and self-improvement."}
       keywords={"Programming,MERN,Redux,React,Nextjs,Machine learning,Data science"}
      />
        <Header
          route={route}
          setRoute={setRoute}
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
        />
        <br />
        <About />
        <Footer/>
    </div>
  )
}

export default Page