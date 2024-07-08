const { useState, useEffect, useRef } = React;

const HeaderLayout = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex justify-between px-6 pt-4 pb-6 dark:bg-gray-800">
      <div>
        <p className="text-primary font-semibold dark:text-white">Dashboard / Sites / Maps</p>
      </div>

      <div>
        <div className="flex gap-x-5">
          <div className="bg-flatGray rounded-md dark:bg-gray-700">
            <ThemeSwitcher />
          </div>

          <div className="w-64">
            <Input placeholder="Search" />
          </div>

          <div className="flex flex-col items-center justify-center bg-flatGray rounded-md p-2 cursor-pointer dark:bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M12 5.33337C12 4.27251 11.5786 3.25509 10.8284 2.50495C10.0783 1.7548 9.06087 1.33337 8 1.33337C6.93913 1.33337 5.92172 1.7548 5.17157 2.50495C4.42143 3.25509 4 4.27251 4 5.33337C4 10 2 11.3334 2 11.3334H14C14 11.3334 12 10 12 5.33337Z"
                stroke="#2F2F33"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="dark:stroke-white"
              />
              <path
                d="M9.15335 14C9.03614 14.2021 8.86791 14.3698 8.6655 14.4864C8.46309 14.6029 8.2336 14.6643 8.00001 14.6643C7.76643 14.6643 7.53694 14.6029 7.33453 14.4864C7.13212 14.3698 6.96389 14.2021 6.84668 14"
                stroke="#2F2F33"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="dark:stroke-white"
              />
            </svg>
          </div>

          <div
            className="flex flex-col justify-center items-center bg-flatGray rounded-md pl-2 cursor-pointer dark:bg-gray-700"
            onClick={toggleDropdown}
            ref={dropdownRef}
          >
            <div className="flex">
              <div className="flex flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="2"
                  viewBox="0 0 16 2"
                  fill="none"
                >
                  <path
                    d="M1 1H15"
                    stroke="#2F2F33"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="dark:stroke-white"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="2"
                  viewBox="0 0 16 2"
                  fill="none"
                >
                  <path
                    d="M1 1H15"
                    stroke="#2F2F33"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="dark:stroke-white"
                  />
                </svg>
              </div>
              <div className="w-8">
                <Avatar
                  src={
                    "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_640.png"
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-8 mt-2 w-64 bg-white rounded-md shadow-lg z-50 dark:bg-gray-700"
          >
            <div className="flex flex-col p-4">
              <div className="flex">
                <Avatar
                  src={
                    "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_640.png"
                  }
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4 flex flex-col">
                  <p className="font-semibold dark:text-white">John Doe</p>
                  <p className="text-xs text-secondary dark:text-gray-400">johndoe@example.com</p>
                </div>
              </div>
            </div>
            <hr className="border-t border-gray-200 dark:border-gray-600" />
            <div className="flex flex-col p-2">
              <button className="py-2 px-4 text-left border-none font-medium rounded-md dark:text-white dark:bg-gray-600">
                Profile
              </button>
              <button className="py-2 px-4 text-left border-none font-medium rounded-md dark:text-white dark:bg-gray-600">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
