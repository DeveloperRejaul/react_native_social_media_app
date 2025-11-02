 
import { createApi } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants/urls'
import { CommentResponse, CreatePostRes, LikeResponse, LoginBody, LoginResponse ,PostsResponse,SignupBody} from '@/src/types'
import query from '../utils/query'
import { router } from 'expo-router'
import { animatedToast } from '../components/Toast'
import { storage } from '../utils/storage'


export const api = createApi({
  reducerPath: 'api',
  baseQuery: query.baseQuery({baseUrl:BASE_URL}),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginBody>({
      query: (body) => ({
        url: `/auth/login`,
        method:"POST",
        body,
      }),
      async onQueryStarted(queryArgument, queryLifeCycleApi) {
        try {
          const {data} = await queryLifeCycleApi.queryFulfilled
          await storage.setItem('USER_TOKEN', data?.access_token || "");
          await storage.setItem('USER_ID', data?.user?.name || "");
          await storage.setItem('USER_EMAIL', data?.user?.email || "");
           animatedToast.show({
            type:"success",
            message:"Login successful"
          });
          router.replace("/(tabs)")
        } catch (error) {
          console.log(JSON.stringify(error));
          animatedToast.show({
            type:"error",
            message:"Email or password invalid"
          });
        }
      },
    }),
    me: builder.query<LoginResponse, {}>({
      query: () => ({
        url: `/auth/me`,
      }),
      async onQueryStarted(queryArgument, queryLifeCycleApi) {
        try {
          await queryLifeCycleApi.queryFulfilled
          router.replace("/(tabs)")
        } catch (error) {
          console.log(error);
          router.replace("/(stack)/Login")
        }
      },
    }),
    signUp: builder.mutation<LoginResponse, SignupBody>({
      query: (body) => ({
        url: `/auth/signup`,
        method:"POST",
        body,
      }),
       async onQueryStarted(queryArgument, queryLifeCycleApi) {
        try {
          await queryLifeCycleApi.queryFulfilled 
          animatedToast.show({
            type:"success",
            message:"Signup successful"
          });
          router.replace("/(stack)/Login")
        } catch (error) {
           animatedToast.show({
            type:"error",
            message:"Something went wrong"
          });
          console.log(JSON.stringify(error));
        }
      },
    }),
    getPosts: builder.query<PostsResponse, {userId: null | string}>({
      query: ({userId}) => {
       let url = '/posts?page=1&limit=10'
       if(userId) {
        url += `&userId=${userId}`
       }
       return url;
      },
    }),
    getPostsByPage: builder.query<PostsResponse, {page:number, limit: number, userId:string|null}>({
      query: ({page = 1, limit = 10, userId}) => {
        let url = `/posts?page=${page}&limit=${limit}`
       if(userId) {
        url += `&userId=${userId}`
       }
       return url;
      },
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getPosts', {userId: queryArg.userId}, (draft) => {
              if (data?.data?.posts && draft?.data?.posts && queryArg.page > 1) {
                draft.data.posts.push(...data.data.posts);
              }
            }),
          );
        } catch (err) {
          console.error('Pagination error:', err);
        }
      },
    }),
    like: builder.mutation<LikeResponse, {id:string, userId:string| null}>({
      query: ({id}) => {
          return {
            url:`/posts/${id}/like`,
            method:"PUT",
            body: {},
          }
      },
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getPosts', {userId: queryArg.userId}, (draft) => {
            const post = draft.data.posts.find((p) => p.id === queryArg.id);
            if (post) {
              post.likes.push({
                id: data.data.id,
                userId: data.data.userId,
                user: { ...data.data.user },
              });
            }
          })
        );
        } catch (err : any) {
          console.log(err);
          animatedToast.show({
            message: err?.error?.data?.message || "You has already liked this post!",
            type:"info"
          })
        }
      },
    }),
    comment: builder.mutation<CommentResponse, {id:string, content:string, userId:string| null}>({
      query: ({id, content}) => {
          return {
            url:`/posts/${id}/comment`,
            method:"PUT",
            body: {
              content,
            },
          }
      },
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getPosts', {userId: queryArg.userId}, (draft) => {
              const post = draft.data.posts.find((p) => p.id === queryArg.id);
              if(post) {
                post.comments.push({
                  content: data?.data?.content || "",
                  id: data?.data?.id || "",
                  userId: data?.data?.userId ||"",
                  user: { ...(data?.data?.user || {}) },
                });
              }
            }),
          );
          router.back()
        } catch (err) {
          console.error(err);
        }
      },
    }),
    createPost: builder.mutation<CreatePostRes, {content:string, userId: string | null}>({
       query: ({content}) => {
          return {
            url:'/posts',
            method:"POST",
            body: {
              content,
            },
          }
      },
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getPosts', {userId: queryArg.userId}, (draft) => {
              if(data.post && draft.data.posts) {
                draft.data.posts.push(data.post)
              }
            }),
          );
          router.back()
        } catch (err) {
          console.error(err);
        }
      },
    }),
    getUsers: builder.query<{data:{id:string, name:string}[], message:string},{}>({
      query() {
        return "/auth/users"
      },
    }),
  }),
})



export const {
  useLoginMutation,
  useSignUpMutation,
  useMeQuery,
  useGetPostsQuery,
  useLazyGetPostsByPageQuery,
  useLikeMutation,
  useCommentMutation,
  useCreatePostMutation,
  useGetUsersQuery
} = api