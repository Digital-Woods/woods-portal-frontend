const FirstNameIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20px"
    viewBox="0 -960 960 960"
    width="20px"
    fill="#000000"
  >
    <path d="M480-492.31q-51.75 0-87.87-36.12Q356-564.56 356-616.31q0-51.75 36.13-87.87 36.12-36.13 87.87-36.13 51.75 0 87.87 36.13Q604-668.06 604-616.31q0 51.75-36.13 87.88-36.12 36.12-87.87 36.12ZM212-219.69v-72.93q0-18.38 10.96-35.42 10.96-17.04 30.66-29.5 52.3-30.07 109.94-46.11t116.23-16.04q58.59 0 116.44 16.04 57.85 16.04 110.15 46.11 19.7 11.46 30.66 29T748-292.62v72.93H212Zm52-52h432v-20.93q0-6.33-4.56-11.91-4.57-5.58-12.59-9.47-43.7-26.46-94.42-40.08Q533.7-367.69 480-367.69q-53.7 0-104.43 13.61-50.72 13.62-94.42 40.08-8.07 5.54-12.61 10.61-4.54 5.07-4.54 10.77v20.93Zm216.21-272.62q29.79 0 50.79-21.21t21-51q0-29.79-21.21-50.79t-51-21q-29.79 0-50.79 21.22-21 21.21-21 51 0 29.78 21.21 50.78t51 21Zm-.21-72Zm0 344.62Z" />
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
    <path d="M480-492.31q-51.75 0-87.87-36.12Q356-564.56 356-616.31q0-51.75 36.13-87.87 36.12-36.13 87.87-36.13 51.75 0 87.87 36.13Q604-668.06 604-616.31q0 51.75-36.13 87.88-36.12 36.12-87.87 36.12ZM212-219.69v-72.93q0-18.38 10.96-35.42 10.96-17.04 30.66-29.5 52.3-30.07 109.94-46.11t116.23-16.04q58.59 0 116.44 16.04 57.85 16.04 110.15 46.11 19.7 11.46 30.66 29T748-292.62v72.93H212Zm52-52h432v-20.93q0-6.33-4.56-11.91-4.57-5.58-12.59-9.47-43.7-26.46-94.42-40.08Q533.7-367.69 480-367.69q-53.7 0-104.43 13.61-50.72 13.62-94.42 40.08-8.07 5.54-12.61 10.61-4.54 5.07-4.54 10.77v20.93Zm216.21-272.62q29.79 0 50.79-21.21t21-51q0-29.79-21.21-50.79t-51-21q-29.79 0-50.79 21.22-21 21.21-21 51 0 29.78 21.21 50.78t51 21Zm-.21-72Zm0 344.62Z" />
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
    <path d="M180.31-212q-27.01 0-45.66-18.66Q116-249.32 116-276.35v-407.62q0-27.03 18.65-45.53t45.66-18.5h599.38q27.01 0 45.66 18.66Q844-710.68 844-683.65v407.62q0 27.03-18.65 45.53T779.69-212H180.31ZM480-449.69 168-633.31v357q0 5.39 3.46 8.85t8.85 3.46h599.38q5.39 0 8.85-3.46t3.46-8.85v-357L480-449.69Zm0-67.31 305.85-179h-611.7L480-517ZM168-633.31V-696v419.69q0 5.39 3.46 8.85t8.85 3.46H168v-369.31Z" />
  </svg>
);

const ProfileUpdate = () => {
  const [isEditPersonalInfo, setIsEditPersonalInfo] = useState(false);
  const { me } = useMe();

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
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
              value={me.firstName}
              onChange={handlePersonalInfoChange}
              className="text-xs text-gray-500 ml-2"
              icon={FirstNameIcon}
            />
          </div>
        ) : (
          <div className="text-xs text-gray-500">{me.firstName}</div>
        )}
      </div>

      <div className="py-2 flex items-center">
        <div className="text-xs font-semibold w-[200px]">Last Name:</div>
        {isEditPersonalInfo ? (
          <div className="flex items-center">
            <Input
              type="text"
              name="lastName"
              value={me.lastName}
              onChange={handlePersonalInfoChange}
              className="text-xs text-gray-500 ml-2"
              icon={SecondNameIcon}
            />
          </div>
        ) : (
          <div className="text-xs text-gray-500">{me.lastName}</div>
        )}
      </div>

      <div className="py-2 flex items-center">
        <div className="text-xs font-semibold w-[200px]">Email:</div>
        {isEditPersonalInfo ? (
          <div className="flex items-center">
            <Input
              type="email"
              name="email"
              value={me.email}
              onChange={handlePersonalInfoChange}
              className="text-xs text-gray-500 ml-2"
              icon={EmailIcon}
            />
          </div>
        ) : (
          <div className="text-xs text-gray-500">{me.email}</div>
        )}
      </div>
    </div>
  );
};
