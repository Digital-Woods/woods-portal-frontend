const classNames = window.classNames;

const Card = ({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={classNames(
        "max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",
        className
      )}
      {...props}
    />
  );
};
