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

type Props = {
}

const page: FC<Props> = (props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [route, setRoute] = useState("Login");
    const {user} = useSelector((state: any) => state.auth)

  return (
    <div>
      <Protected>
      <Heading
        title={`${user?.name} Profile`}
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
      </Protected>
    </div>
  )
}

export default page