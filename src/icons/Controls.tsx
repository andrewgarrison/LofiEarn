import { IconSize } from "./types";

interface Props {
  size?: IconSize;
  className?: string;
}

export const ControlsIcon = (props: Props) => {
  const { size = "md", className } = props;

  const sizes: Record<IconSize, string> = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-12 h-12 md:w-16 md:h-16",
  };

  return (
    <svg
      className={`${sizes[size]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
    </svg>
  );
};
