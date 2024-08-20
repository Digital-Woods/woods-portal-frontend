const FirstNameIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20px"
    viewBox="0 -960 960 960"
    width="20px"
    fill="#000000"
  >
    <path d="M480-480q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42ZM192-192v-96q0-23 12.5-43.5T239-366q55-32 116.29-49 61.29-17 124.5-17t124.71 17Q666-398 721-366q22 13 34.5 34t12.5 44v96H192Zm72-72h432v-24q0-5.18-3.03-9.41-3.02-4.24-7.97-6.59-46-28-98-42t-107-14q-55 0-107 14t-98 42q-5 4-8 7.72-3 3.73-3 8.28v24Zm216.21-288Q510-552 531-573.21t21-51Q552-654 530.79-675t-51-21Q450-696 429-674.79t-21 51Q408-594 429.21-573t51 21Zm-.21-72Zm0 360Z" />
  </svg>
);

const SecondNameIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20px"
    viewBox="0 -960 960 960"
    width="20px"
    fill="#000000"
  >
    <path d="M480-480q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42ZM192-192v-96q0-23 12.5-43.5T239-366q55-32 116.29-49 61.29-17 124.5-17t124.71 17Q666-398 721-366q22 13 34.5 34t12.5 44v96H192Zm72-72h432v-24q0-5.18-3.03-9.41-3.02-4.24-7.97-6.59-46-28-98-42t-107-14q-55 0-107 14t-98 42q-5 4-8 7.72-3 3.73-3 8.28v24Zm216.21-288Q510-552 531-573.21t21-51Q552-654 530.79-675t-51-21Q450-696 429-674.79t-21 51Q408-594 429.21-573t51 21Zm-.21-72Zm0 360Z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20px"
    viewBox="0 -960 960 960"
    width="20px"
    fill="#000000"
  >
    <path d="M168-192q-29.7 0-50.85-21.16Q96-234.32 96-264.04v-432.24Q96-726 117.15-747T168-768h624q29.7 0 50.85 21.16Q864-725.68 864-695.96v432.24Q864-234 842.85-213T792-192H168Zm312-240L168-611v347h624v-347L480-432Zm0-85 312-179H168l312 179Zm-312-94v-85 432-347Z" />
  </svg>
);

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

      <div className="py-2 flex items-center">
        <div className="text-xs font-semibold w-[200px]">First Name:</div>
        {isEditPersonalInfo ? (
          <div className="flex items-center">
            <Input
              type="text"
              name="firstName"
              value={personalInfo.firstName}
              onChange={handlePersonalInfoChange}
              className="text-xs text-gray-500 ml-2"
              icon={FirstNameIcon}
            />
          </div>
        ) : (
          <div className="text-xs text-gray-500">{personalInfo.firstName}</div>
        )}
      </div>

      <div className="py-2 flex items-center">
        <div className="text-xs font-semibold w-[200px]">Last Name:</div>
        {isEditPersonalInfo ? (
          <div className="flex items-center">
            <Input
              type="text"
              name="lastName"
              value={personalInfo.lastName}
              onChange={handlePersonalInfoChange}
              className="text-xs text-gray-500 ml-2"
              icon={SecondNameIcon}
            />
          </div>
        ) : (
          <div className="text-xs text-gray-500">{personalInfo.lastName}</div>
        )}
      </div>

      <div className="py-2 flex items-center">
        <div className="text-xs font-semibold w-[200px]">Email:</div>
        {isEditPersonalInfo ? (
          <div className="flex items-center">
            <Input
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
              className="text-xs text-gray-500 ml-2"
              icon={emailIcon}
            />
          </div>
        ) : (
          <div className="text-xs text-gray-500">{personalInfo.email}</div>
        )}
      </div>
    </div>
  );
};
