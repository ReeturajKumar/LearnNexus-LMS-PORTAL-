import { styles } from "@/app/styless/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

type Props = {};

const FAQ = (props: Props) => {
  const { data } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestions, setActiveQuestions] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestions(activeQuestions === id ? null : id);
  };
  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto">
        <h1
          className={`${styles.title} dark:text-white text-black 800px:text-[40px}`}
        >
          Frequently Asked <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent pl-1">Questions</span>
        </h1>
        <div className="mt-12">
          <dl className="space-y-8">
            {questions.map((q) => (
              <div
                key={q.id}
                className={`${
                  q._id !== questions[0]?._id && " border-t"
                } border-gray-200 pt-6`}
              >
                <dt className="text-lg">
                  <button
                    className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                    onClick={() => toggleQuestion(q._id)}
                  >
                    <span className="font-medium text-black dark:text-white">
                      {q.question}
                    </span>
                    <span className="ml-6 flex-shrink-0">
                      {activeQuestions === q._id ? (
                        <HiMinus className="dark:text-white text-black" />
                      ) : (
                        <HiPlus className="dark:text-white text-black" />
                      )}
                    </span>
                  </button>
                </dt>
                {activeQuestions === q._id && (
                  <dd className="mt-2 pr-12">
                    <p className="text-base dark:text-white text-black">
                      {q.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default FAQ;
