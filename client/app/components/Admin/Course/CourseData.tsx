/* eslint-disable @typescript-eslint/no-explicit-any */
import { styles } from "@/app/styless/style";
import React, { FC } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
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
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  }


  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  }


  const prevButton = () => {
    setActive(active - 1);
  }

  const handleOptions = () => {
    if(benefits[benefits.length -1].title !== "" && prerequisites[prerequisites.length -1]?.title !== "") {
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
          What are the prerequisites for taking this course?
        </label>
        <br />
        {prerequisites.map((prerequisites: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Prerequisites"
            placeholder="You need to have basic HTML and CSS..."
            required
            className={`${styles.input} my-2`}
            value={prerequisites.title}
            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon onClick={handleAddPrerequisites} 
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
