/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Footer from '../components/Footer/Footer'
import Policy from './Policy'

type Props = {}

const Page = (props: Props) => {

    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(3);
  return (
    <div>
      <Heading
       title={"Policy - LearnNexus"}
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
        <br/>
        <Policy />
        <Footer/>
    </div>
  )
}

export default Page