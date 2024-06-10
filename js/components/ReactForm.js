const { useMutation } = ReactQuery;
const { useForm } = ReactHookForm;
const { z } = Zod;

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 4 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 4 characters.",
  }),
});

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

const ReactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const { mutate: addUser, isLoading } = useMutation({
    mutationKey: ["addUser"],
    mutationFn: async (input) => {
      try {
        const response = await axios.post(
          "https://api.example.com/users",
          input,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error("Network response was not ok");
      }
    },
    onSuccess: (data) => {
      console.log("data", data);
    },
  });

  const onSubmit = (data) => {
    console.log("data", data);
    addUser(data);
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Use a permanent address where you can receive mail.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                {...register("firstName")}
                type="text"
                id="first-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                {...register("lastName")}
                type="text"
                id="last-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.lastName && <p>{errors.lastName.message}</p>}
            </div>
          </div>
        </div>
      </div>
 
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLoading ? "Loading" : "Submit"}
        </button>
      </div>
    </form>
  );
};
