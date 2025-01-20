/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'

import React, {FC,useState} from 'react';
import Heading from './utils/Heading';
import Header from './components/Header';
import Hero from './components/Hero';

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activateItem, setActivateItem] = useState(0);
  return (
    <div>
      <Heading
        title="LearnNexus"
        description="LearnNexus is a platform that provides a wide range of courses and resources for learning and self-improvement."
        keywords="Programming,MERN,Redux,React,Nextjs,Machine learning,Data science"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activateItem={activateItem}
      />
      <Hero/>
    </div>
  )
}


export default Page