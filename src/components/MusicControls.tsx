import { useState, useEffect, useRef } from "react";
import { PlayIcon, PauseIcon, ControlsIcon } from "../icons";
import { Player } from "../hooks/useSoundcloud";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
  player: Player;
  isTrackVisible: boolean;
  setIsTrackVisible: (arg: boolean) => void;
}

export const MusicControls = ({
  player,
  isTrackVisible,
  setIsTrackVisible,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [, setForceUpdate] = useState(0);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  useEffect(() => {
    if (player) {
      if (isPlaying) player.play();
      else player.pause();
    }
  }, [player]);

  if (player) {
    player.isPaused((isPaused) => setIsPlaying(!isPaused));
  }

  return (
    <div className="relative h-96 flex items-end" ref={ref}>
      {isOpen && (
        <div className="bg-gray-800 rounded-lg padding text-white mb-4 absolute px-3 py-6 flex flex-col items-center justify-center top-[30%] -right-5 min-w-[110px]">
          <div
            className="cursor-pointer mb-4"
            onClick={() => {
              isPlaying ? player.pause() : player.play();
              setForceUpdate(Math.random());
            }}
          >
            {isPlaying ? <PauseIcon size="lg" /> : <PlayIcon size="lg" />}
          </div>
          <div
            className="cursor-pointer text-center"
            onClick={() => setIsTrackVisible(!isTrackVisible)}
          >
            {isTrackVisible ? "Hide Track" : "Show Track"}
          </div>
        </div>
      )}
      <div
        className="cursor-pointer hover:scale-110 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ControlsIcon size="lg" />
      </div>
    </div>
  );
};
