"use client";
import { styles } from "@/app/styless/style";
import React, { FC } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";

type Benefit = { id: number; title: string };
type Prerequisite = { id: number; title: string };

type Props = {
  benefits: Benefit[];
  setBenefits: (benefits: Benefit[]) => void;
  prereqisites: Prerequisite[];
  setprereqisites: (prereqisites: Prerequisite[]) => void;
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
  const handleBenefitChange = (id: number, value: string) => {
    setBenefits(
      benefits.map((benefit) =>
        benefit.id === id ? { ...benefit, title: value } : benefit
      )
    );
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { id: Date.now(), title: "" }]);
  };

  const handlePrerequisiteChange = (id: number, value: string) => {
    setprereqisites(
      prereqisites.map((prerequisite) =>
        prerequisite.id === id ? { ...prerequisite, title: value } : prerequisite
      )
    );
  };

  const handleAddPrerequisites = () => {
    setprereqisites([...prereqisites, { id: Date.now(), title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prereqisites[prereqisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`}>
          What are the benefits of this course?
        </label>
        <br />
        {benefits.map((benefit) => (
          <input
            type="text"
            key={benefit.id}
            name="Benefit"
            placeholder="You will be able to build a full-stack web app..."
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(benefit.id, e.target.value)}
          />
        ))}
        <AddCircleIcon
          onClick={handleAddBenefit}
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px", height: "30px" }}
        />
      </div>

      <div>
        <label className={`${styles.label} text-[20px]`}>
          What are the prerequisites for taking this course?
        </label>
        <br />
        {prereqisites.map((prerequisite) => (
          <input
            type="text"
            key={prerequisite.id}
            name="prerequisites"
            placeholder="You need to have basic HTML and CSS..."
            required
            className={`${styles.input} my-2`}
            value={prerequisite.title}
            onChange={(e) => handlePrerequisiteChange(prerequisite.id, e.target.value)}
          />
        ))}
        <AddCircleIcon
          onClick={handleAddPrerequisites}
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px", height: "30px" }}
        />
      </div>
      
      <div className="w-full flex justify-between items-center">
        <div
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer flex items-center justify-center"
          onClick={prevButton}
        >
          Previous
        </div>
        <div
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer flex items-center justify-center"
          onClick={handleOptions}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;