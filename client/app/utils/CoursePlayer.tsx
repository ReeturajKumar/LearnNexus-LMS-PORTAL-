import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
  setLoading(true);
  axios
    .post("https://learnnexus-lms-portal.onrender.com/api/v1/getVdoCipherOTP", {
      videoId: videoUrl,
    })
    .then((res) => {
      setVideoData(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to fetch OTP:", err);
      setLoading(false);
    });
}, [videoUrl]);


  return (
    <div style={{position: "relative", paddingTop: "56.25%", overflow: "hidden"}}>
     {loading ? (
  <p>Loading video...</p>
) : (
  videoData.otp &&
  videoData.playbackInfo && (
    <iframe
      src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=Sh4pjwlXiTijM6bC`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "0",
      }}
      allowFullScreen={true}
      allow="encrypted-media"
    ></iframe>
  )
)}
    </div>
  );
};

export default CoursePlayer;
