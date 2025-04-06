/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

"use client"
import React, { FC, useState} from 'react'
import Protected from '../hooks/useProtexted'
import Header from '../components/Header';
import Heading from '../utils/Heading';
import { useSelector } from 'react-redux';
import Profile from '../components/Profile/Profile';
import Footer from '../components/Footer/Footer';

type Props = {
}

const page: FC<Props> = (props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("Login");
    const {user} = useSelector((state: any) => state.auth)

  return (
    <div className='min-h-screen'>
      <Protected>
      <Heading
        title={`${user?.name} Profile - LearnNexus`}
        description="LearnNexus is a platform that provides a wide range of courses and resources for learning and self-improvement."
        keywords="Programming,MERN,Redux,React,Nextjs,Machine learning,Data science"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Profile
      user={user}
      />
      
      </Protected>
      <br />
      <br />
      <Footer/>
    </div>
  )
}

export default page