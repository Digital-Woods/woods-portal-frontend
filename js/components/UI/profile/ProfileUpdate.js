const ProfileUpdate = () => {
  const [isEditPersonalInfo, setIsEditPersonalInfo] = useState(false);
  const [personalInfo, setPersonalInfo] = useRecoilState(profileState);

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  return (
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
          <div className="text-xs text-gray-500">{personalInfo.firstName}</div>
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
          <div className="text-xs text-gray-500">{personalInfo.lastName}</div>
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
  );
};
