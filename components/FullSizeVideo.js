import React from "react";
import { PropTypes } from "prop-types";
import { Video } from "expo-av";

const FullSizeVideo = (props) => {
  const video = React.useRef(null);

  return (
    <Video
      {...props}
      style={{ aspectRatio: 2 }}
      ref={video}
      useNativeControls
      resizeMode="contain"
      isLooping
      onLoad={async () => {
        await video.current?.playAsync();
      }}
      isMuted={true}
    />
  );
};

FullSizeVideo.propTypes = {
  source: PropTypes.object,
};

export default FullSizeVideo;
