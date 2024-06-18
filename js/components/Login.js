const { useMutation } = ReactQuery;
const { useForm } = ReactHookForm;
const { z } = Zod;

const loginUserValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

const Login = () => {
  let [serverError, setServerError] = useState(null);

  const { mutate: login, isLoading } = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: async (input) => await Client.authentication.login(input),
    onSuccess: (data) => {},
    onError: (error) => {
      if(error.response.data) setServerError(error.response.data);
    },
  });

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className="bg-light-100 dark:bg-dark-100 p-5">
      <Form
        onSubmit={onSubmit}
        validationSchema={loginUserValidationSchema}
        serverError={serverError}
        className="bg-light-100 dark:bg-dark-100"
      >
        {({ register, formState: { errors } }) => (
          <div>
            { console.log("errors", errors) }
            <div className="text-dark dark:text-light">
              <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-light">
                Login
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600  dark:text-light">
                Use a permanent address where you can receive mail.
              </p>

              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...register("email")} />
                </FormControl>
                {errors.email && (
                  <FormMessage className="text-red-600">
                    {errors.email.message}
                  </FormMessage>
                )}
              </FormItem>

              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...register("password")} />
                </FormControl>
                {errors.password && (
                  <FormMessage className="text-red-600">
                    {errors.password.message}
                  </FormMessage>
                )}
              </FormItem>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button href="/home">Home</Button>
              <Button type="submit" isLoading={isLoading}>
                Submit
              </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};
