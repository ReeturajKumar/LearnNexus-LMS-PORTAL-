/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from 'react';
import { BiSolidChevronDown, BiSolidChevronUp } from 'react-icons/bi';
import { MdOutlineOndemandVideo } from 'react-icons/md';

type VideoItem = {
  _id: string;
  title: string;
  videoLength: number; // in minutes
  videoSection: string;
};

type Props = {
  data: VideoItem[];
  activeVideo?: number;
  setActiveVideo?: (index: number) => void;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = ({ data, activeVideo, setActiveVideo, isDemo }) => {
  const [visibleSection, setVisibleSection] = useState<Set<string>>(new Set<string>());

  const videoSections: string[] = [...new Set<string>(data?.map((item) => item.videoSection))];

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
    <div className={`mt-6 w-full ${isDemo ? 'ml-[-30px] sticky top-24 left-0 z-30' : ''}`}>
      {videoSections.map((section: string) => {
        const isSectionVisible = visibleSection.has(section);
        const sectionVideos = data.filter((item) => item.videoSection === section);
        const sectionVideoCount = sectionVideos.length;

        const sectionVideolength = sectionVideos.reduce((totalLength, item) => {
          const length = typeof item.videoLength === 'number' ? item.videoLength : 0;
          return totalLength + length;
        }, 0);

        const sectionStartIndex = totalCount;
        totalCount += sectionVideoCount;

        const sectionContentHours = sectionVideolength / 60;

        return (
          <div key={section} className="rounded-lg shadow-md bg-white dark:bg-gray-800 ml-4">
            <div className="w-full flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{section}</h2>
              <button className="cursor-pointer text-gray-700 dark:text-white" onClick={() => toggleSection(section)}>
                {isSectionVisible ? <BiSolidChevronUp size={20} /> : <BiSolidChevronDown size={20} />}
              </button>
            </div>
            <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
              {sectionVideoCount} Lessons -{' '}
              {sectionVideolength < 60
                ? `${sectionVideolength} Minutes`
                : `${sectionContentHours.toFixed(2)} Hours`}
            </div>
            {isSectionVisible && (
              <div className="w-full">
                {sectionVideos.map((item, index) => {
                  const videoIndex = sectionStartIndex + index;
                  const rawLength = typeof item.videoLength === 'number' ? item.videoLength : 0;
                  const contentLength = rawLength / 60;

                  return (
                    <div
                      className={`w-full flex items-center gap-4 p-4 transition-all cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        videoIndex === activeVideo ? 'bg-blue-100 dark:bg-blue-900' : ''
                      }`}
                      key={item._id}
                      onClick={() => (!isDemo && setActiveVideo ? setActiveVideo(videoIndex) : null)}
                    >
                      <MdOutlineOndemandVideo size={25} className="text-blue-500" />
                      <div>
                        <h1 className="text-base font-medium text-gray-900 dark:text-white">{item.title}</h1>
                        <h5 className="text-sm text-gray-600 dark:text-gray-400">
                          {rawLength > 60 ? `${contentLength.toFixed(2)} Hours` : `${rawLength} Minutes`}
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
