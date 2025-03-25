import React from "react";
import { Badge } from '@mui/material';
import Link from "next/link";

const webinars = [
  {
    title: "Google Cloud Next 2025",
    url: "https://developers.google.com/events",
    source: "Google Developer Events",
    status: "upcoming",
    image: "https://www.valtech.com/globalassets/00-global/02-images/10-events/2024-events/meet-valtech-at-google-cloud-next-25/google-next-25---initial--lp-navigation1.png",
    description: "Connect with industry luminaries and network with peers from around the world. Next is where leading minds come together to share what they’re creating."
  },
  {
    title: "Aspen Technology India",
    url: "https://www.aspentech.com/en/events-listing",
    source: "Aspen Technology India",
    status: "upcoming",
    image: "https://d2n4wb9orp1vta.cloudfront.net/cms/brand/vm/2021-vm/emerson_aspentech.jpg;maxWidth=1200",
    description: "AspenTech is a global asset management software leader, providing enterprise asset performance management, asset performance monitoring, and asset optimization solutions."
  },
  {
    title: "Institute of Electrical and Electronics E...",
    url: "https://innovate.ieee.org/free-webinars-from-ieee/",
    source: "IEEE Webinars",
    image: "https://engg.cambridge.edu.in/wp-content/uploads/2023/06/IEEE-scaled.jpg",
    description: "The Institute of Electrical and Electronics Engineers is an American 501 public charity for electrical engineering, electronics engineering, and other related disciplines."
  },
];

const Webinars = () => {
  return (
    <div className="w-[100%] max-w-7xl m-auto pt-10 pb-20">
      <h1 className="text-center font-poppins text-3xl lg:text-4xl font-bold tracking-tight text-white">
        Upcoming & <span className="text-blue-500">Live Webinars</span>
      </h1>
      <p className="text-center text-gray-400 mt-2">Stay ahead in tech with expert-led sessions.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {webinars.map((webinar, index) => (
          <div
            key={index}
            className="bg-gray-900 p-5 rounded-lg shadow-md text-white border border-gray-700"
          >
            <img src={webinar.image} alt={webinar.title} className="w-full h-40 object-cover rounded-md" />
            <div className="flex justify-between items-center mt-3">
              <h3 className="text-xl font-semibold">{webinar.title}</h3>
            </div>
            <p className="text-gray-400 text-sm mt-1">{webinar.source}</p>
            <p className="text-gray-400 text-sm mt-2">{webinar.description}</p>
            <Link
              href={webinar.url}
              className="mt-4 inline-block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Join Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Webinars;
