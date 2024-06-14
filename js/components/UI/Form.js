const Form = ({ children, className }) => {
  return children;
};

const FormItem = ({ children, className }) => (
  <div className={`mb-5 ${className}`}>{children}</div>
);

const FormLabel = ({ children, className }) => (
  <label className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${className}`}>
    {children}
  </label>
);

const FormControl = ({ children, className }) => (
  <div className={` ${className}`}>{children}</div>
);

const FormMessage = ({ children, className }) => (
  <div className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>
    {children}
  </div>
);

// const Input = ({ placeholder, className }) => (
//   <input
//     type="text"
//     placeholder={placeholder}
//     className={`block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 ${className}`}
//   />
// );

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  console.log("props", props)
  return (
    (<input
      type={type}
      className={classNames(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"