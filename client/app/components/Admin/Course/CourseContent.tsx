/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { FC, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { styles } from "@/app/styless/style";
import { BiSolidPencil } from "react-icons/bi";
import LinkIcon from "@mui/icons-material/Link";
import AddIcon from "@mui/icons-material/Add";
import toast from "react-hot-toast";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedIsCollapsed = [...isCollapsed];
    updatedIsCollapsed[index] = !updatedIsCollapsed[index];
    setIsCollapsed(updatedIsCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const handleAddItem = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: 0,
        videoSection: newVideoSection,
        links: [
          {
            title: "",
            url: "",
          },
        ],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: 0,
        videoSection: `Untitled Section  ${activeSection}`,
        links: [
          {
            title: "",
            url: "",
          },
        ],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Section cannot be empty");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };


  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-min"
                        } font-poppins dark:text-white text-black cursor-pointer bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BiSolidPencil className="cursor-pointer dark:text-white text-black" />
                    </div>
                    <br />
                  </>
                )}
                <div className="flex justify-between w-full items-center my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-poppins dark:text-white text-black">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  {/* arrow btn */}

                  <div className="flex items-center">
                    <DeleteOutlineOutlinedIcon
                      className={`dark:text-white text-black text-[20px] mr-2 ${
                        index > 0 ? "cursor-pointer" : "cursor-not-allowed"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    />

                    <KeyboardArrowDownOutlinedIcon
                      fontSize="large"
                      className="dark:text-white text-black"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className={styles.label}>Video Title</label>
                      <input
                        type="text"
                        placeholder="Project Name"
                        className={styles.input}
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className={styles.label}>Video Url</label>
                      <input
                        type="text"
                        placeholder="https://www.youtube.com/"
                        className={styles.input}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>


                    <div className="mb-3">
                      <label className={styles.label}>Video Length (in minutes)</label>
                      <input
  type="number"
  placeholder="20"
  className={styles.input}
  value={item.videoLength !== undefined ? item.videoLength : ""}
  onChange={(e) => {
    const updatedData = [...courseContentData];
    updatedData[index].videoLength = Number(e.target.value);
    setCourseContentData(updatedData);
  }}
/>
                    </div>

                    <div className="mb-3">
                      <label className={styles.label}>Video Description</label>
                      <textarea
                        rows={8}
                        cols={30}
                        placeholder="Project Description"
                        className={`${styles.input} !h-min py-2`}
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />

                      <br />

                      {item?.links.map((_link: any, linkIndex: number) => (
                        <div className="mb-3 block">
                          <div className="w-full flex items-center justify-between">
                            <label className={styles.label}>
                              Link {linkIndex + 1}
                            </label>
                            <DeleteOutlineOutlinedIcon
                              className={`${
                                linkIndex === 0
                                  ? "cursor-not-allowed"
                                  : "cursor-pointer"
                              } dark:text-white text-black text-[20px]`}
                              onClick={() =>
                                linkIndex === 0
                                  ? null
                                  : handleRemoveLink(index, linkIndex)
                              }
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Source Code... (Link title)"
                            className={`${styles.input}`}
                            value={item.links[linkIndex].title}
                            onChange={(e) => {
                              const updatedData = [...courseContentData];
                              updatedData[index].links[linkIndex].title =
                                e.target.value;
                              setCourseContentData(updatedData);
                            }}
                          />

                          <input
                            type="text"
                            placeholder="Source Code URL... (Link URL)"
                            className={`${styles.input} mt-6`}
                            value={item.links[linkIndex].url}
                            onChange={(e) => {
                              const updatedData = [...courseContentData];
                              updatedData[index].links[linkIndex].url =
                                e.target.value;
                              setCourseContentData(updatedData);
                            }}
                          />
                        </div>
                      ))}
                      <br />
                      <div className="inline-block mb-4">
                        <p
                          className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                          onClick={() => handleAddLink(index)}
                        >
                          <LinkIcon className="mr-2" /> Add Link
                        </p>
                      </div>
                    </div>
                  </>
                )}
                <br />
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={(e: any) => handleAddItem(item)}
                    >
                      <AddIcon className="mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}

        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AddCircleOutlinedIcon className="mr-2" /> Add New Section
        </div>
      </form>
      <br />
      <div className="w-full flex justify-between items-center">
        <div
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer flex items-center justify-center"
          onClick={() => prevButton()}
        >
          Previous
        </div>
        <div
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer flex items-center justify-center"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
