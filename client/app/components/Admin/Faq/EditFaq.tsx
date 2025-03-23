/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { styles } from '@/app/styless/style';
import { useEditLayoutMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { IoMdAddCircleOutline } from 'react-icons/io';

type FaqItem = {
  _id: string;
  question: string;
  answer: string;
  active?: boolean;
};

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading, isError } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

    const [editLayout, { isSuccess:layoutSuccess, error }] = useEditLayoutMutation();

  const [questions, setQuestions] = useState<FaqItem[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
    if(layoutSuccess){
      toast.success("FAQ updated successfully");
    }
    if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [data, error, layoutSuccess]);

  const toggleQuestion = (id: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question._id === id ? { ...question, active: !question.active } : question
      )
    );
  };

  const handleQuestionChange = (id: string, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question._id === id ? { ...question, question: value } : question
      )
    );
  };

  const handleAnswerChange = (id: string, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question._id === id ? { ...question, answer: value } : question
      )
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        _id: Date.now().toString(), // Temporary ID
        question: "",
        answer: "",
        active: false,
      },
    ]);
  };

  const areQuestionsUnchanged = (originalQuestions: FaqItem[], newQuestions: FaqItem[]) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions: FaqItem[]) => {
    return questions.some((q) => q.question.trim() === "" || q.answer.trim() === "");
  };

  const handleEdit = async () => {
    if(!areQuestionsUnchanged(data.layout.faq,questions) && !isAnyQuestionEmpty(questions)){
      await editLayout({ type: "FAQ", faq: questions });
    }
  };

  return (
    <div className='w-[90%] 800px:w-[80%] m-auto mt-[120px]'>
      <div className='mt-12'>
        <dl className='space-y-8'>
          {questions.map((item) => (
            <div
              key={item._id}
              className={`${item._id !== questions[0]._id && "mt-8 border-t"} border-gray-200 pt-6`}
            >
              <dt className='text-lg'>
                <button
                  className='flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none'
                  onClick={() => toggleQuestion(item._id)}
                >
                  <input
                    className={`${styles.input} border-none`}
                    value={item.question}
                    onChange={(e) => handleQuestionChange(item._id, e.target.value)}
                    placeholder='Add your question here....'
                  />
                  <span className='ml-6 flex-shrink-0'>
                    {item.active ? <HiMinus /> : <HiPlus />}
                  </span>
                </button>
              </dt>
              {item.active && (
                <dd className='mt-2 pl-12'>
                  <input
                    className={`${styles.input} border-none`}
                    value={item.answer}
                    onChange={(e) => handleAnswerChange(item._id, e.target.value)}
                    placeholder='Add your answer here....'
                  />
                  <span>
                    <AiOutlineDelete
                      className='dark:text-white text-black cursor-pointer'
                      onClick={() =>
                        setQuestions((prevQuestions) =>
                          prevQuestions.filter((question) => question._id !== item._id)
                        )
                      }
                    />
                  </span>
                </dd>
              )}
            </div>
          ))}
        </dl>
        <br />
        <IoMdAddCircleOutline className='dark:text-white text-black cursor-pointer' onClick={newFaqHandler} />
      </div>
      <div
        className={`${styles.button} !w-[100px] !h-[40px] mt-4 dark:text-white text-black bg-[#cccccc34]
          ${
            areQuestionsUnchanged(data?.layout?.faq || [], questions) || isAnyQuestionEmpty(questions)
              ? "!cursor-not-allowed opacity-50"
              : "!cursor-pointer bg-blue-500 hover:bg-blue-600"
          }
          !rounded absolute bottom-12 right-12
        `}
        onClick={
          areQuestionsUnchanged(data?.layout?.faq || [], questions) || isAnyQuestionEmpty(questions)
            ? () => {}
            : handleEdit
        }
      >
        Save
      </div>
    </div>
  );
};

export default EditFaq;