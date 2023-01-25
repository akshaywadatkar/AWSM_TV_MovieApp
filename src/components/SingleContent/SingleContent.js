// import { Badge } from "@material-ui/core";
import { Badge } from "@mui/material";
import React from "react";
import { img_300, unavailable } from "../../config/config";
import ContentModel from "../ContentModal/ContentModal";
import "./SingleContent.css";
const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <ContentModel media_type={media_type} id={id} >
      <Badge
      overlap="rectangular"
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      ></Badge>
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModel>
  );
};

export default SingleContent;
