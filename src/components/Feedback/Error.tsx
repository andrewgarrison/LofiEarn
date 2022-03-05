interface Props {
  title?: string;
  message?: string;
}

export const Error = ({ title = "Error", message = "" }: Props) => {
  return (
    <div className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
      <svg
        className="w-12 h-12 text-red-400 mx-auto mb-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="text-2xl font-semibold text-center !mt-3">{title}</h3>
      {message && <p className="text-gray-600 dark:text-gray-200">{message}</p>}
    </div>
  );
};
