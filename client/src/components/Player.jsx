import React from "react";
import ReactPlayer from "react-player";
import s from "./Styles/Player.module.css";

export default function Player({ url }) {
  return (
    <div className={s.root}>
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        playing={true}
        loop
        muted={true}
        style={{
          position: `absolute`,
          alignSelf: "center",
          top: 0,
          bottom: 0,
          left: 0,
        }}
      />
    </div>
  );
}
