import type { SetStateAction } from "react";
import type { IconType } from "react-icons";
import type { PlayerMode, View } from "@/app/page";
import { useRef, useState } from "react";
import {
  FaBackward,
  FaForward,
  FaGear,
  FaPause,
  FaPlay,
} from "react-icons/fa6";

function AudioPlayerControl({
  Icon,
  srOnlyText,
  onClick,
  disabled = false,
}: {
  Icon: IconType;
  srOnlyText: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className="disabled:opacity-60 disabled:pointer-events-none"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <span>
        <span aria-hidden={true}>
          <Icon className="size-5" />
        </span>
      </span>
      <span className="sr-only">{srOnlyText}</span>
    </button>
  );
}

type AudioPlayerProps = {
  playerMode: PlayerMode;
  view: View;
  setView: React.Dispatch<SetStateAction<View>>;
} & React.AudioHTMLAttributes<HTMLAudioElement>;

function AudioPlayer({ src, loop, playerMode, view, setView }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClickPlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  };
  return (
    <div>
      <audio ref={audioRef} src={src} loop={loop}></audio>
      <div className="card">
        <AudioPlayerControl
          Icon={FaBackward}
          srOnlyText="Previous"
          onClick={() => {}}
          disabled
        />
        <AudioPlayerControl
          Icon={isPlaying ? FaPause : FaPlay}
          srOnlyText={isPlaying ? "Pause" : "Play"}
          onClick={handleClickPlayPause}
          disabled={view === "settings"}
        />
        <AudioPlayerControl
          Icon={FaForward}
          srOnlyText="Next"
          onClick={() => {}}
          disabled
        />
        <span className="inline-block">&middot;</span>
        <AudioPlayerControl
          Icon={FaGear}
          srOnlyText="Settings"
          onClick={() =>
            setView(prevState =>
              prevState === "settings" ? playerMode : "settings"
            )}
        />
      </div>
    </div>
  );
}

export default AudioPlayer;
