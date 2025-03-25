import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    getAllCourses: builder.query({
     query: () => ({
      url: "get-admin-courses",
      method: "GET",
      credentials: "include" as const,
     })
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),


    editCourse: builder.mutation({
      query: ({id,data}) => ({
        url: `edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),


    getAllUserCourses: builder.query({
      query: () => ({
        url: "get-course",
        method: "GET",
        credentials: "include",
      })
      
    }),



    
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `get-course/${id}`,
        method: "GET",
        credentials: "include",
      })
      
    }),
    
  }),
})

export const {useCreateCourseMutation, useGetAllCoursesQuery,useDeleteCourseMutation,useEditCourseMutation, useGetAllUserCoursesQuery,useGetCourseDetailsQuery} = coursesApi;