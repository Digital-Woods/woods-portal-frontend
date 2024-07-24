const { useState, useEffect, useRef } = React;

const NavLink = ({ to, className, activeClassName, children }) => {
  return (
    <a
      href={to}
      className={`block hover:bg-primary p-3 hover:text-white rounded-md no-underline ${className}`}
    >
      {children}
    </a>
  );
};

const HeaderLayout = ({ title }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const { sidebarCollapsed, setSidebarCollapsed } = useCollapsible();
  const { routes, setRoutes } = useRoute();

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between px-2 lg:px-6 lg:pt-4 lg:pb-6 dark:bg-gray-800">
      <div className="hidden lg:block">
        <p className="text-primary font-semibold flex dark:text-white">
          Home{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="18px"
            className="dark:fill-white mt-[2px]"
          >
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
          </svg>{" "}
          {title}
        </p>
      </div>

      <div className="lg:hidden">
        <div className="cursor-pointer" onClick={toggleSidebar}>
          <p className="text-primary font-semibold dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="dark:fill-white fill-black"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </p>
        </div>
        <div
          className={`fixed top-0 left-0 h-full z-50 w-64 bg-gray-200 dark:bg-gray-800 shadow-lg transform transition-transform ease-in-out duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="min-h-screen px-6 pt-6 pb-8 transition-width duration-300 bg-white dark:bg-gray-800">
            <div>
              <div className="flex justify-between items-center mb-10">
                <div className="w-[60%] flex items-center">
                  <Logo />

                  <div
                    className="text-white cursor-pointer ml-6 bg-gray-900 p-3 rounded-md"
                    onClick={toggleSidebar}
                  >
                    X
                  </div>
                </div>
              </div>
              <nav className="space-y-1">
                {routes.length > 0 &&
                  routes.map(({ path, title, icon }) => (
                    <NavLink
                      key={path}
                      to={path}
                      className="block hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-white px-3 py-2.5 rounded-md no-underline"
                      activeClassName="dark:bg-gray-900 dark:text-white bg-gray-100"
                    >
                      <div className="flex items-center gap-x-2">
                        <SvgRenderer svgContent={icon} />
                        <p
                          className={`${
                            sidebarCollapsed ? "hidden" : ""
                          } text-black dark:text-white`}
                        >
                          {title}
                        </p>
                      </div>
                    </NavLink>
                  ))}
                <div>
                  <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
                </div>
                <NavLink
                  to="/logout"
                  className="block hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-white px-3 py-2.5 rounded-md no-underline"
                  activeClassName="dark:bg-gray-900 dark:text-white bg-gray-100"
                >
                  <div className="flex items-center gap-x-2">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        className="dark:fill-white"
                      >
                        <path
                          d="M6.66667 2H2V6.66667H6.66667V2Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.0002 2H9.3335V6.66667H14.0002V2Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.0002 9.33337H9.3335V14H14.0002V9.33337Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.66667 9.33337H2V14H6.66667V9.33337Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p
                      className={`${
                        sidebarCollapsed ? "hidden" : ""
                      } text-black dark:text-white`}
                    >
                      Log Out
                    </p>
                  </div>
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex gap-x-5">
          <div className="bg-flatGray rounded-md dark:bg-gray-700">
            <ThemeSwitcher />
          </div>

          <div
            className="flex flex-col justify-center items-center bg-flatGray rounded-md pl-2 cursor-pointer dark:bg-gray-700"
            onClick={toggleDropdown}
            ref={toggleButtonRef}
          >
            <div className="flex">
              <div className="flex flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="2"
                  viewBox="0 0 16 2"
                  className="dark:fill-white mb-[3px] mr-1"
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
                  className="dark:fill-white  mr-1"
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
                  <p className="text-xs text-secondary dark:text-gray-400">
                    johndoe@example.com
                  </p>
                </div>
              </div>
            </div>
            <hr className="border-t border-gray-200 dark:border-gray-600" />
            <div className="flex flex-col gap-y-1  p-2">
              <Button variant="outline" className="dark:text-white">
                Profile
              </Button>
              <Button variant="destructive" className="dark:text-white">
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

