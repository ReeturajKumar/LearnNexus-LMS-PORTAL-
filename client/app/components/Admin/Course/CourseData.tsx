/* eslint-disable @typescript-eslint/no-explicit-any */
import { styles } from "@/app/styless/style";
import React, { FC } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prereqisites: { title: string }[];
  setprereqisites: (prereqisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prereqisites,
  setprereqisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenifits = [...benefits];
    updatedBenifits[index].title = value;
    setBenefits(updatedBenifits);
  };


  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);

  }


  const handlePrerequisiteChange = (index: number, value: string) => {
    const updatedprereqisites = [...prereqisites];
    updatedprereqisites[index].title = value;
    setprereqisites(updatedprereqisites);
  }


  const handleAddprereqisites = () => {
    setprereqisites([...prereqisites, { title: "" }]);
  }


  const prevButton = () => {
    setActive(active - 1);
  }

  const handleOptions = () => {
    if(benefits[benefits.length -1].title !== "" && prereqisites[prereqisites.length -1]?.title !== "") {
      setActive(active + 1);
    }else {
      toast.error("Please fill all the fields")
    }
  }
  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`}>
          What are the benefits of this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Benefit"
            placeholder="You will be able to build a full-stack web app..."
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon onClick={handleAddBenefit} 
        style={{margin: "10px 0px", cursor: "pointer", width: "30px", height: "30px"}}
        />
      </div>


      <div>
        <label className={`${styles.label} text-[20px]`}>
          What are the prereqisites for taking this course?
        </label>
        <br />
        {prereqisites.map((prereqisites: any, index: number) => (
          <input
            type="text"
            key={index}
            name="prereqisites"
            placeholder="You need to have basic HTML and CSS..."
            required
            className={`${styles.input} my-2`}
            value={prereqisites.title}
            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon onClick={handleAddprereqisites} 
        style={{margin: "10px 0px", cursor: "pointer", width: "30px", height: "30px"}}
        />
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer flex items-center justify-center"
        onClick={() => prevButton()}
        >
          Previous
        </div>
        <div className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer flex items-center justify-center"
        onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
