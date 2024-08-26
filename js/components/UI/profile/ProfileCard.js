const ProfileCard = () => {
  const { me } = useMe();

  return (
    <div className="flex justify-between dark:bg-dark-300 p-5 bg-white rounded-md mt-8">
      <div className="flex gap-x-10">
        <div className="w-[80px]">
          <img
            src="https://www.shutterstock.com/shutterstock/photos/2459622791/display_1500/stock-vector-user-circle-isolated-icon-user-round-outline-vector-icon-with-editable-stroke-2459622791.jpg"
            alt="Profile"
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col justify-center space-y-1">
          <h1 className="text-2xl font-semibold dark:text-white">{`${me.firstName} ${me.lastName}`}</h1>
          <p className="text-secondary font-medium text-sm">
            Sales Manager, Stonbury
          </p>
          <p className="text-xs font-normal text-secondary">{me.email}</p>
        </div>
      </div>
    </div>
  );
};
