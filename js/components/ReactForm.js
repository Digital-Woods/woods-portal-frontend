const { useMutation } = ReactQuery;
const { useForm } = ReactHookForm;
const { z } = Zod;

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
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
      <div>
        <input {...register("username")} />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <button type="submit">
        <span>{isLoading ? "Loading" : "Submit"}</span>
      </button>
    </form>
  );
};
