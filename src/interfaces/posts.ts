import { User } from "./user"

export interface Post {
  _id: string
  body?: string
  image?: string
  user: User
  createdAt: string
  comments: Comment[]
  id: string
}