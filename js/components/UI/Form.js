const { useForm } = ReactHookForm;

const Form = ({
  onSubmit,
  children,
  useFormProps,
  validationSchema,
  serverError,
  resetFields,
  ...formProps
}) => {
  const zodResolver = (schema) => async (data) => {
    try {
      const values = schema.parse(data);
      return { values, errors: {} };
    } catch (e) {
      return {
        values: {},
        errors: e.errors.reduce((acc, error) => {
          acc[error.path[0]] = { type: error.code, message: error.message };
          return acc;
        }, {}),
      };
    }
  };

  const methods = useForm({
    ...useFormProps,
    ...(validationSchema && {
      resolver: zodResolver(validationSchema),
    }),
  });
  useEffect(() => {
    if (serverError) {
      Object.entries(serverError).forEach(([key, value]) => {
        methods.setError(key, {
          type: "manual",
          message: value,
        });
      });
    }
  }, [serverError, methods]);

  useEffect(() => {
    if (resetFields) {
      methods.reset(resetFields);
    }
  }, [resetFields, methods]);

  return (
    <form noValidate onSubmit={methods.handleSubmit(onSubmit)} {...formProps}>
      {children(methods)}
    </form>
  );
};

const FormItem = ({ children, className }) => (
  <div className={`mb-5 ${className}`}>{children}</div>
);

const FormLabel = ({ children, className }) => (
  <label
    className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${className}`}
  >
    {children}
  </label>
);

const FormControl = ({ children, className }) => (
  <div className={` ${className}`}>{children}</div>
);

const FormMessage = ({ children, className }) => (
  <p class="mt-2 text-sm text-red-600 dark:text-red-500">{children}</p>
);

const Input = React.forwardRef(
  (
    {
      className,
      type = "text",
      placeholder = "Search",
      height = "medium",
      icon: Icon = DefaultIcon,
      ...props
    },
    ref
  ) => {
    const heightClasses = {
      small: "py-1",
      semiMedium: "py-2",
      medium: "py-3",
      large: "py-5",
    };

    return (
      <div className="relative dark:bg-dark-300 flex items-center">
        <div className="absolute left-3 top-3 h-4 w-4 text-gray-500 top-2">
          <Icon />
        </div>
        <input
          type={type}
          placeholder={placeholder}
          className={classNames(
            "w-full rounded-md bg-cleanWhite pl-10 px-5 text-sm transition-colors border border-2 dark:border-gray-600 focus:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400",
            heightClasses[height],
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

const DefaultIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width="20px"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const Textarea = React.forwardRef(
  (
    { className, placeholder = "Leave a comment...", rows = 4, ...props },
    ref
  ) => {
    return (
      <textarea
        rows={rows}
        className={classNames(
          "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          className
        )}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    );
  }
);
