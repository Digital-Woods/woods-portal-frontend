const Login = () => {
  let [serverError, setServerError] = useState(null);
  const [alert, setAlert] = useState(null);
  const loginUserValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4, {
      message: "Password must be at least 4 characters.",
    }),
  });

  const { getMe, me } = useMe();

  const setItemAsync = async (key, value, days = env.COOKIE_EXPIRE) => {
    return new Promise((resolve) => {
      setCookie(key, value, days);
      resolve();
    });
  };

  const { mutate: login, isLoading } = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: async (input) => {
      try {
        const response = await Client.authentication.login({
          username: input.email,
          password: input.password,
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: async (data) => {
      if (!data.data.token) {
        setAlert({ message: "Wrong email or password", type: "error" });
        return;
      }
      // await setItemAsync(env.AUTH_TOKEN_KEY, data.data.token);
      setItemAsync(env.AUTH_TOKEN_KEY, data.data.token).then(() => {
        getMe();
      });
      setAlert({ message: "Login successful", type: "success" });
      window.location.hash = "/";
    },
    onError: (error) => {
      let errorMessage = "An unexpected error occurred.";

      if (error.response && error.response.data) {
        const errorData = error.response.data.detailedMessage;
        setServerError(errorData);

        errorMessage =
          typeof errorData === "object" ? JSON.stringify(errorData) : errorData;
      }

      setAlert({ message: errorMessage, type: "error" });
    },
  });

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className="flex items-center bg-flatGray dark:bg-gray-800 justify-center h-screen">
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="dark:bg-gray-900 bg-cleanWhite py-8 px-4 flex flex-col items-center justify-center rounded-lg w-[30%]">
        <div className="w-16">
          <img
            src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
            alt="user photo"
          />
        </div>
        <div className="w-full">
          <Form
            onSubmit={onSubmit}
            validationSchema={loginUserValidationSchema}
            serverError={serverError}
            className="dark:bg-gray-900"
          >
            {({ register, formState: { errors } }) => (
              <div className="text-gray-800 dark:text-gray-200">
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-gray-800 dark:text-gray-300 focus:text-blue-600">
                    Email
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        height="medium"
                        icon={emailIcon}
                        placeholder="Email"
                        className="focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                        {...register("email")}
                      />
                    </div>
                  </FormControl>
                  {errors.email && (
                    <FormMessage className="text-red-600 dark:text-red-400">
                      {errors.email.message}
                    </FormMessage>
                  )}
                </FormItem>

                <FormItem>
                  <FormLabel className="text-xs font-semibold text-gray-800 dark:text-gray-300 focus:text-blue-600">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        placeholder="Password"
                        icon={passwordIcon}
                        type="password"
                        className="focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                        {...register("password")}
                      />
                    </div>
                  </FormControl>
                  {errors.password && (
                    <FormMessage className="text-red-600 dark:text-red-400">
                      {errors.password.message}
                    </FormMessage>
                  )}
                </FormItem>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Input type="checkbox" icon="none" className="mr-1 ml-2" />
                    <p className="text-xs text-gray-800 dark:text-gray-300">
                      Keep me signed in
                    </p>
                  </div>

                  <div>
                    <NavLink to="/forget-password">
                      <p className="text-black text-xs dark:text-gray-300">
                        Forget password?
                      </p>
                    </NavLink>
                  </div>
                </div>

                <div className="mt-4 flex flex-col justify-center items-center">
                  <Button className="w-full" isLoading={isLoading}>
                    Continue
                  </Button>
                </div>
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
