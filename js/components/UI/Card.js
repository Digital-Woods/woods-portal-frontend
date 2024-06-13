const classNames = window.classNames;

const Card = ({ className, ...props }) => {
  return (
    <div
      className={classNames('max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700', className)}
      {...props}
    />
  );
};
