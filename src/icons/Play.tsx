import { IconSize } from "./types";

interface Props {
  size?: IconSize;
  className?: string;
}

export const PlayIcon = (props: Props) => {
  const { size = "md", className } = props;

  const sizes: Record<IconSize, string> = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-20 h-20",
  };

  return (
    <svg
      className={`${sizes[size]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
        clipRule="evenodd"
      />
    </svg>
  );
};
