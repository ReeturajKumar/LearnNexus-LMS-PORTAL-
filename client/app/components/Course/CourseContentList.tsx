/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react';
import { BiSolidChevronDown, BiSolidChevronUp } from 'react-icons/bi';
import { MdOutlineOndemandVideo } from 'react-icons/md';

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = (props) => {
  const [visibleSection, setVisibleSection] = useState<Set<string>>(new Set<string>());

  const videoSections: string[] = [...new Set<string>(props.data?.map((item: any) => item.videoSection))];

  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSection = new Set(visibleSection);
    if (newVisibleSection.has(section)) {
      newVisibleSection.delete(section);
    } else {
      newVisibleSection.add(section);
    }
    setVisibleSection(newVisibleSection);
  };

  return (
    <div className={`mt-6 w-full ${props.isDemo ? 'ml-[-30px] sticky top-24 left-0 z-30' : ''}`}>
      {videoSections.map((section: string, sectionIndex: number) => {
        const isSectionVisible = visibleSection.has(section);
        const sectionVideos: any[] = props.data.filter((item: any) => item.videoSection === section);
        const sectionVideoCount: number = sectionVideos.length;
        const sectionVideolength: number = sectionVideos.reduce((totalLength: number, item: any) => totalLength + item.videoLength, 0);
        const sectionStartIndex: number = totalCount;
        totalCount += sectionVideoCount;
        const sectionContentHours: number = sectionVideolength / 60;

        return (
          <div key={section} className="rounded-lg shadow-md bg-white dark:bg-gray-800 ml-4">
            <div className="w-full flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{section}</h2>
              <button className="cursor-pointer text-gray-700 dark:text-white" onClick={() => toggleSection(section)}>
                {isSectionVisible ? <BiSolidChevronUp size={20} /> : <BiSolidChevronDown size={20} />}
              </button>
            </div>
            <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
              {sectionVideoCount} Lessons - {sectionVideolength < 60 ? sectionVideolength : sectionContentHours.toFixed(2)} {sectionVideolength > 60 ? 'Hours' : 'Minutes'}
            </div>
            {isSectionVisible && (
              <div className="w-full">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index;
                  const contentLength: number = item.videoLength / 60;
                  return (
                    <div
                      className={`w-full flex items-center gap-4 p-4 transition-all cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        videoIndex === props.activeVideo ? 'bg-blue-100 dark:bg-blue-900' : ''
                      }`}
                      key={item._id}
                      onClick={() => (props.isDemo ? null : props?.setActiveVideo(videoIndex))}
                    >
                      <MdOutlineOndemandVideo size={25} className="text-blue-500" />
                      <div>
                        <h1 className="text-base font-medium text-gray-900 dark:text-white">{item.title}</h1>
                        <h5 className="text-sm text-gray-600 dark:text-gray-400">
                          {item.videoLength > 60 ? contentLength.toFixed(2) : item.videoLength} {item.videoLength > 60 ? 'Hours' : 'Minutes'}
                        </h5>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
