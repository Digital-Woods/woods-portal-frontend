const { useMutation } = ReactQuery;
const { useForm } = ReactHookForm;
const { z } = Zod;

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  // firstName: z.string().optional(),
  // lastName: z.string().nonempty({ message: "Last name is required." }),
  // age: z
  //   .string()
  //   .regex(/\d+/, { message: "Please enter number for age." })
  //   .optional(),
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
    mutationFn: async (input) =>
      fetch("https://api.example.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
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
      <input {...register("username")} />
      {errors.username && <p>{errors.username.message}</p>}

      {/* <input {...register("firstName")} />

      <input {...register("lastName")} />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <input {...register("age")} />
      {errors.age && <p>{errors.age.message}</p>} */}

      <input type="submit" />
    </form>
  );
};
