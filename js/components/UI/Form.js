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

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={classNames(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

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
