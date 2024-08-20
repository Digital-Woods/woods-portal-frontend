const { useMutation } = ReactQuery;
const { useForm } = ReactHookForm;
const { z } = Zod;

const Profile = ({ title, path }) => {
  const [isEditPersonalInfo, setIsEditPersonalInfo] = useState(false);
  const [personalInfo, setPersonalInfo] = useRecoilState(profileState);

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
              {!isEditPersonalInfo ? "Edit" : "Save"}
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
