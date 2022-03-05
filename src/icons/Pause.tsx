import { IconSize } from "./types";

interface Props {
  size?: IconSize;
  className?: string;
}

export const PauseIcon = (props: Props) => {
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
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
};
