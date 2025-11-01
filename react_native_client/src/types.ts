export type LoginResponse = {
  message: string;
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};


export type LoginBody = {
    email:string;
    password:string
}

export type SignupBody = {
  name:string;
  email:string;
  password:string
}

export type Error = {
  status: number;
  message:string
}
export type Success<T = any> = {
 data: T
}
export type StoreKeyTypes = "BASE_URL" | "USER_TOKEN" | "USER_ID" | "USER_EMAIL";
export interface User {
  id: string;
  name: string;
  email?: string; // optional because nested user objects under likes/comments don't include email
}

export interface Like {
  id: string;
  userId: string;
  user: Pick<User, 'name'>;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  user: Pick<User, 'name'>;
}

export interface Post {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  likes: Like[];
  comments: Comment[];
}

export type LikeResponse = {
  message:string,
 data: {
  "createdAt": string,
  "id": string,
  "postId":string,
  "updatedAt": string,
  "user": {
        "email":string,
        "id": string,
        "name": string
    },
  "userId": string
 }
}

export type CommentResponse = {
  message:string,
 data: {
  "createdAt": string,
  "id": string,
  "postId":string,
  "updatedAt": string,
  content: string,
  "user": {
        "email":string,
        "id": string,
        "name": string
    },
  "userId": string
 }
}

export type CreatePostRes ={
    message: string;
    post: Post;
}


export interface PostsResponse {
  data: {
    message: string;
    posts: Post[];
  };
  total_page: number;
  current_page: number;
  total_count: number;
}
