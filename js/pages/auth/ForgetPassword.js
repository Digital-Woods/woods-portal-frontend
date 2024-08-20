const { useMutation } = ReactQuery;
const { useForm } = ReactHookForm;
const { z } = Zod;

const loginUserValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

const NavLink = ({ to, className, activeClassName, children }) => (
  <a
    href={to}
    className={`block hover:bg-primary p-3 hover:text-white rounded-md no-underline ${className}`}
  >
    {children}
  </a>
);

const emailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    className="dark:fill-white"
  >
    <path d="M192.62-232q-24.32 0-40.47-16.16T136-288.66v-383.01Q136-696 152.15-712t40.47-16h574.76q24.32 0 40.47 16.16t16.15 40.5v383.01Q824-264 807.85-248t-40.47 16H192.62ZM480-467.38 168-655.62v367q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h574.76q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-367L480-467.38Zm0-49.62 299.69-179H180.31L480-517ZM168-655.62V-696v407.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92H168v-391.62Z" />
  </svg>
);

const passwordIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    className="dark:fill-white"
  >
    <path d="M288.33-136q-23.56 0-39.95-16.53Q232-169.07 232-192.62v-334.76q0-23.55 16.53-40.09Q265.07-584 288.62-584H328v-96q0-63.53 44.3-107.76Q416.61-832 480.23-832q63.62 0 107.69 44.24Q632-743.53 632-680v96h39.38q23.55 0 40.09 16.53Q728-550.93 728-527.38v334.76q0 23.55-16.55 40.09Q694.91-136 671.34-136H288.33Zm.29-32h382.76q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-334.76q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92H288.62q-10.77 0-17.7 6.92-6.92 6.93-6.92 17.7v334.76q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92Zm191.59-140q22.1 0 36.94-15.06Q532-338.12 532-360.21q0-22.1-15.06-36.94Q501.88-412 479.79-412q-22.1 0-36.94 15.06Q428-381.88 428-359.79q0 22.1 15.06 36.94Q458.12-308 480.21-308ZM360-584h240v-96q0-50-35-85t-85-35q-50 0-85 35t-35 85v96Zm-96 416v-384 384Z" />
  </svg>
);

const ForgetPassword = () => {
  const [serverError, setServerError] = useState(null);
  const [step, setStep] = useState(1);

  const { mutate: password, isLoading } = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: async (input) =>
      await Client.authentication.forgetPassword(input),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      if (error.response.data) setServerError(error.response.data);
    },
  });

  const onSubmit = (data) => {
    if (step === 1) {
      setStep(2);
    } else {
      password(data);
      console.log(data, "data");
    }
  };

  return (
    <div className="flex items-center bg-flatGray justify-center h-screen">
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
                {step === 1 && (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold focus:text-blue-600">
                      Enter your email
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
                    <div className="mt-4 flex flex-col justify-center items-center">
                      <Button
                        className="w-full"
                        type="button"
                        onClick={onSubmit}
                      >
                        Continue
                      </Button>
                    </div>
                  </FormItem>
                )}

                {step === 2 && (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold focus:text-blue-600">
                      Set new password
                    </FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          type="password"
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
                    <div className="mt-4 flex flex-col justify-center items-center">
                      <Button className="w-full" type="submit">
                        Login
                      </Button>
                    </div>
                  </FormItem>
                )}
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};