import { cn } from "../../utils";
import { FC } from "react";

type LoadingSpinnerProps = {
  className?: string;
};

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "w-full h-full flex justify-center items-center",
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-spin stroke-primary w-12 h-12"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
