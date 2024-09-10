const { useSetRecoilState } = Recoil;

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    className="fill-black dark:fill-white"
  >
    <path d="M480.18-353.85q60.97 0 103.47-42.68t42.5-103.65q0-60.97-42.68-103.47t-103.65-42.5q-60.97 0-103.47 42.68t-42.5 103.65q0 60.97 42.68 103.47t103.65 42.5ZM480-392q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm.11 152q-129.96 0-236.88-70.73Q136.31-381.46 83.08-500q53.23-118.54 160.04-189.27T479.89-760q129.96 0 236.88 70.73Q823.69-618.54 876.92-500q-53.23 118.54-160.04 189.27T480.11-240ZM480-500Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    className="fill-black dark:fill-white"
  >
    <path d="M617.85-454.15 586-486q9-52.38-29.69-90.69Q517.62-615 466-606l-31.85-31.85q10.08-4.15 21.04-6.23 10.96-2.07 24.81-2.07 61.15 0 103.65 42.5 42.5 42.5 42.5 103.65 0 13.85-2.07 25.58-2.08 11.73-6.23 20.27Zm126.46 122.92L714-358q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-31.23-31.23q34.85-13.15 70.92-18.96Q443.77-760 480-760q130.23 0 238.23 71.58 108 71.57 158.69 188.42-21.46 48.23-54.34 90.65-32.89 42.43-78.27 78.12Zm44.61 216.77L633.23-269.69q-26.54 11.77-65.88 20.73Q528-240 480-240q-131 0-238.23-71.58Q134.54-383.15 83.08-500q23.3-53 61.46-99.27 38.15-46.27 81.46-77.65l-111.54-112 28.31-28.31 674.46 674.46-28.31 28.31ZM254.31-648.62q-34.39 24.47-70.31 64.31-35.92 39.85-56 84.31 50 101 143.5 160.5T480-280q34.62 0 69.77-6.73t52.85-13.58L537.38-366q-9.46 5.31-26.38 8.73-16.92 3.42-31 3.42-61.15 0-103.65-42.5-42.5-42.5-42.5-103.65 0-13.31 3.42-29.85 3.42-16.53 8.73-27.53l-91.69-91.24ZM541-531Zm-112.54 56.54Z" />
  </svg>
);

const Login = () => {
  const [serverError, setServerError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const loginUserValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().nonempty({
      message: "Password is required.",
    }),
  });

  const { getMe, me } = useMe();
  const setUserDetails = useSetRecoilState(userDetailsAtom);

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
      if (!data.data.tokenData.token) {
        setAlert({ message: "Wrong email or password", type: "error" });
        return;
      }
      setItemAsync(env.AUTH_TOKEN_KEY, data.data.tokenData.token).then(() => {
        getMe();
      });

      setUserDetails(data.data.loggedInDetails);
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

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
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
                        className=""
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
                    <div className="relative">
                      <Input
                        placeholder="Password"
                        icon={passwordIcon}
                        type={showPassword ? "text" : "password"}
                        className=" "
                        {...register("password")}
                      />
                      <span
                        className="absolute right-2 top-2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                      </span>
                    </div>
                  </FormControl>
                  {errors.password && (
                    <FormMessage className="text-red-600 dark:text-red-400">
                      {errors.password.message}
                    </FormMessage>
                  )}
                </FormItem>

                <div className="flex justify-end items-center">
                  <div>
                    <NavLink to="/forget-password">
                      <p className="text-black text-xs dark:text-gray-300">
                        Forget password?
                      </p>
                    </NavLink>
                  </div>
                </div>

                <div className="mt-4 flex flex-col justify-center items-center">
                  <Button
                    className="w-full !bg-defaultPrimary"
                    isLoading={isLoading}
                  >
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
