import { CommentCreator } from "./CommentCreator"

export interface Comment {
  _id: string
  content?: string
  commentCreator: CommentCreator
  post: string
  createdAt: string
}