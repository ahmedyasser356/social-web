import { convertDate } from "@/helpers/convertDate";
import { Comment } from "@/interfaces/comment";

import { Avatar, CardHeader } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

export default function CommentItem({ comment }: { comment: Comment }) {

  //convert the date to redable full date format
  

  return (
    <>
      <CardHeader
      className="comment"
        sx={{ backgroundColor: "#00000010" }}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <img src={comment.commentCreator.photo} width="100%" />
          </Avatar>
        }
       
        title={comment.content}
        subheader={convertDate(comment.createdAt)}
      />
    </>
  );
}
