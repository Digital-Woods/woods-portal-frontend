const { useMutation } = ReactQuery;
const { useForm } = ReactHookForm;
const { z } = Zod;

const Profile = ({ title, path }) => {
  const [isEditPersonalInfo, setIsEditPersonalInfo] = useState(false);
  const [personalInfo, setPersonalInfo] = useRecoilState(profileState);

  const { data, error, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => await Client.getProfileDetails.all,
    onSuccess: (response) => {
      const { firstName, lastName, email } = response.data;

      setPersonalInfo({
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
      });
    },
  });

  console.log(data);

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="p-6 w-[calc(100%_-350px)]">
        <div>
          <h1 className="text-xl font-semibold dark:text-white mb-2">
            My Profile Settings
          </h1>
          <p className="text-secondary leading-5 text-sm">
            Manage and update your profile settings
          </p>
        </div>

        <div className="flex justify-between dark:bg-dark-300 p-5 bg-white rounded-md mt-8">
          <div className="flex gap-x-10">
            <div className="w-[80px]">
              <img
                src="https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg"
                alt="Profile"
                className="rounded-full"
              />
            </div>

            <div className="flex flex-col justify-center space-y-1">
              <h1 className="text-2xl font-semibold dark:text-white">{`${personalInfo.firstName} ${personalInfo.lastName}`}</h1>
              <p className="text-secondary font-medium text-sm">
                Sales Manager, Stonbury
              </p>
              <p className="text-xs font-normal text-secondary">
                {personalInfo.email}
              </p>
            </div>
          </div>
          {/* 
          <Button variant="outline" size="sm" className="text-secondary">
            <span>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                className="fill-secondary dark:fill-white mr-2"
              >
                <path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z" />
              </svg>
            </span>{" "}
            Edit
          </Button> */}
        </div>

        <div className="p-5 dark:bg-dark-300 bg-white rounded-md mt-5 dark:text-white">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold pb-4">Personal Information</h1>
            <Button
              variant="outline"
              size="sm"
              className="text-secondary"
              onClick={() => setIsEditPersonalInfo(!isEditPersonalInfo)}
            >
              {!isEditPersonalInfo && (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    className="fill-secondary dark:fill-white mr-2"
                  >
                    <path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z" />
                  </svg>
                </span>
              )}
              {isEditPersonalInfo ? "Save" : "Edit"}
            </Button>
          </div>

          <div className="py-2 flex">
            <div className="text-xs font-semibold w-[200px]">First Name:</div>
            {isEditPersonalInfo ? (
              <Input
                type="text"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handlePersonalInfoChange}
                className="text-xs text-gray-500"
                icon="none"
              />
            ) : (
              <div className="text-xs text-gray-500">
                {personalInfo.firstName}
              </div>
            )}
          </div>

          <div className="py-2 flex">
            <div className="text-xs font-semibold w-[200px]">Last Name:</div>
            {isEditPersonalInfo ? (
              <Input
                type="text"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handlePersonalInfoChange}
                className="text-xs text-gray-500"
                icon="none"
              />
            ) : (
              <div className="text-xs text-gray-500">
                {personalInfo.lastName}
              </div>
            )}
          </div>

          <div className="py-2 flex">
            <div className="text-xs font-semibold w-[200px]">Email:</div>
            {isEditPersonalInfo ? (
              <Input
                type="email"
                name="email"
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
                className="text-xs text-gray-500"
                icon="none"
              />
            ) : (
              <div className="text-xs text-gray-500">{personalInfo.email}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
