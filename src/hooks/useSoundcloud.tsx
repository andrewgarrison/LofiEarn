import { useEffect, useState, RefObject } from "react";
import { useScript } from "usehooks-ts";
import { soundcloudTracks } from "../constants";
import { getRandomFromArray } from "../utils/getters";

declare global {
  interface Window {
    SC: any;
  }
}

export interface Player {
  play: Function;
  pause: Function;
  isPaused: Function;
}

export const useSoundcloud = <T extends HTMLElement>(
  elementRef: RefObject<T>
) => {
  const [player, setPlayer] = useState<Player>(null);
  const [track, setTrack] = useState("");
  const soundcloudScript = useScript("https://w.soundcloud.com/player/api.js");

  useEffect(() => {
    setTrack(getRandomFromArray(soundcloudTracks));
  }, []);

  useEffect(() => {
    if (soundcloudScript === "ready") {
      const player: Player = window?.SC?.Widget(elementRef.current);
      setPlayer(player);
    }
  }, [soundcloudScript]);

  return { player, track };
};
