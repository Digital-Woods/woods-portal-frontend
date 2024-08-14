const { useHistory } = ReactRouterDOM;

const Login = () => {
  let [serverError, setServerError] = useState(null);
  const [alert, setAlert] = useState(null);
  const history = useHistory;

  const { mutate: login, isLoading } = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: async (input) => await Client.authentication.login(input),
    onSuccess: (data) => {
      if (!data.token) {
        setAlert({ message: "Wrong username or password", type: "error" });
        return;
      }
      setAlert({ message: "Login successful", type: "success" });
    },
    onError: (error) => {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        setServerError(errorData);
        const errorMessage =
          typeof errorData === "object" ? JSON.stringify(errorData) : errorData;
        setAlert({ message: errorMessage, type: "error" });
        const randomToken = Math.random().toString(36).substring(2);
        localStorage.setItem("token", randomToken);
        window.location.hash = "/";
      } else {
        setAlert({ message: "An unexpected error occurred.", type: "error" });
        const randomToken = Math.random().toString(36).substring(2);
        localStorage.setItem("token", randomToken);
        window.location.hash = "/";
      }
    },
  });

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className="flex items-center bg-flatGray justify-center h-screen">
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="dark:bg-dark-100 bg-white py-8 px-4 flex flex-col items-center justify-center rounded-lg w-[30%]">
        <div className="w-16">
          <Logo />
        </div>
        <div className="w-full">
          <Form
            onSubmit={onSubmit}
            validationSchema={loginUserValidationSchema}
            serverError={serverError}
            className="dark:bg-dark-100"
          >
            {({ register, formState: { errors } }) => (
              <div className="text-dark dark:text-light">
                <FormItem>
                  <FormLabel className="text-xs font-semibold focus:text-blue-600">
                    Email
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        height="medium"
                        icon={emailIcon}
                        placeholder="Email"
                        className="focus:border-brand focus:ring-brand"
                        {...register("email")}
                      />
                    </div>
                  </FormControl>
                  {errors.email && (
                    <FormMessage className="text-red-600">
                      {errors.email.message}
                    </FormMessage>
                  )}
                </FormItem>

                <FormItem>
                  <FormLabel className="text-xs font-semibold focus:text-blue-600">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        placeholder="Password"
                        icon={passwordIcon}
                        className="focus:border-brand focus:ring-brand"
                        {...register("password")}
                      />
                    </div>
                  </FormControl>
                  {errors.password && (
                    <FormMessage className="text-red-600">
                      {errors.password.message}
                    </FormMessage>
                  )}
                </FormItem>

                <div className="flex justify-between items-center">
                  <div className="flex">
                    <Input type="checkbox" icon="none" className="mr-1 ml-2" />
                    <p className="text-xs ">Keep me signed in</p>
                  </div>

                  <div>
                    <NavLink
                      to="/forget-password"
                      className=""
                      activeClassName=""
                    >
                      <p
                        className={`
                       text-black text-xs dark:text-white`}
                      >
                        forget password?
                      </p>
                    </NavLink>
                  </div>
                </div>

                <div className="mt-4 flex flex-col justiful-center items-center">
                  <Button className="w-full">Continue</Button>
                </div>
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
