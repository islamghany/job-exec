import { useState } from "react";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

interface PageHeaderProps<T> {
  createJob: () => Promise<T>;
  onSettled: (job: T | null, error: Error | null) => void;
  title: string;
  buttonText: string;
}

export function PageHeader<T>({
  buttonText,
  createJob,
  title,
  onSettled,
}: PageHeaderProps<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleButtonClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    let data: T | null = null;
    let error: Error | null = null;
    try {
      const createdJob = await createJob();
      data = createdJob;
    } catch (err) {
      error = err as Error;
    }
    if (onSettled) {
      onSettled(data, error);
    }
    setIsLoading(false);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
      </div>
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <button
          type="button"
          className={classNames(
            "ml-3 inline-flex items-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm ",
            isLoading
              ? "cursor-not-allowed bg-gray-400"
              : " bg-indigo-600 hover:bg-indigo-700  cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          )}
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : buttonText}
        </button>
      </div>
    </div>
  );
}
