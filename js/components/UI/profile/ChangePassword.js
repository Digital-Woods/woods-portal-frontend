const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-5 dark:bg-dark-300 bg-white rounded-md mt-5 dark:text-white">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold pb-4">Password Settings</h1>
        <Button variant="outline" size="sm" className="text-secondary">
          save
        </Button>
      </div>
      <div className="py-2 flex">
        <div className="text-xs font-semibold w-[200px]">Current Password:</div>
        <Input
          type="password"
          placeholder="Current Password"
          name="currentPassword"
          value={passwords.currentPassword}
          onChange={handlePasswordChange}
          className="text-xs text-gray-500"
          icon="none"
        />
      </div>

      <div className="py-2 flex">
        <div className="text-xs font-semibold w-[200px]">New Password:</div>
        <Input
          type="password"
          placeholder="New password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handlePasswordChange}
          className="text-xs text-gray-500"
          icon="none"
        />
      </div>

      <div className="py-2 flex">
        <div className="text-xs font-semibold w-[200px]">
          Confirm New Password:
        </div>
        <Input
          type="password"
          placeholder="Confirm password"
          name="confirmNewPassword"
          value={passwords.confirmNewPassword}
          onChange={handlePasswordChange}
          className="text-xs text-gray-500"
          icon="none"
        />
      </div>
    </div>
  );
};
