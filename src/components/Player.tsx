import { useRef, useState } from "react";
import { useSoundcloud } from "../hooks";
import { MusicControls } from "./MusicControls";

export const Player = () => {
  const iframeRef = useRef(null);
  const [isTrackVisible, setIsTrackVisible] = useState(false);
  const { player, track } = useSoundcloud(iframeRef);

  return (
    <>
      <div
        className={`absolute right-8 ${
          isTrackVisible ? "bottom-32" : "bottom-16"
        }`}
      >
        <MusicControls
          isTrackVisible={isTrackVisible}
          setIsTrackVisible={setIsTrackVisible}
          player={player}
        />
      </div>
      <iframe
        ref={iframeRef}
        className={`absolute bottom-0 w-full ${
          isTrackVisible ? "" : "sr-only"
        } ${isTrackVisible ? "bottom-0" : "bottom-1"}`}
        width="100%"
        height="108"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${track}&color=%238500ff&auto_play=true&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
      />
    </>
  );
};
