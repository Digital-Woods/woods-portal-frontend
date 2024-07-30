const { useState, useEffect } = React;

const NavLink = ({ to, className, activeClassName, children }) => {
  return (
    <a
      href={to}
      className={`block hover:bg-primary p-3 hover:text-white  rounded-md no-underline ${className}`}
    >
      {children}
    </a>
  );
};

const SideLayout = ({ className }) => {
  const [logoutDialog, setLogoutDialog] = useState(false);
  const { sidebarCollapsed, setSidebarCollapsed } = useCollapsible();
  const [isSecondIcon, setIsSecondIcon] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    setIsSecondIcon(!isSecondIcon);
  };

  const { routes, setRoutes } = useRoute();

  return (
    <div>
      <div className={className}>
        <div
          className={`h-[100vh] overflow-hidden sticky top-0 px-6 pt-6 pb-8 transition-width bg-sidelayoutColor duration-300  dark:bg-dark-300 hidden lg:block`}
        >
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-8 h-[50px]">
              <div className="flex items-center">
                <div className="mr-2 w-8">
                  <Logo />
                </div>

                <h1
                  className={`text-lg font-semibold pr-4 pl-1 text-white dark:text-white ${
                    sidebarCollapsed ? "hidden" : "block"
                  }`}
                >
                  STONBURY
                </h1>
              </div>
              <div
                className="cursor-pointer flex items-center"
                onClick={toggleSidebar}
              >
                {isSecondIcon ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    className="fill-white"
                  >
                    <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    className="fill-white"
                  >
                    <path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z" />
                  </svg>
                )}
              </div>
            </div>
            <nav className="space-y-1  flex-1">
              <div className=" flex flex-col h-full justify-between ">
                <div>
                  {routes.length > 0 &&
                    routes.map(({ path, title, icon }) => (
                      <NavLink
                        key={path}
                        to={path}
                        className="block hover:bg-dark-400 dark:hover:bg-dark-400 dark:hover:text-white p-3 rounded-md no-underline"
                        activeClassName="dark:bg-dark-600 dark:text-white bg-activeState"
                      >
                        <div
                          className={`flex items-center gap-x-3 gap-y-1 ${
                            sidebarCollapsed
                              ? "justify-center"
                              : "justify-start"
                          }`}
                        >
                          <div>
                            <SvgRenderer svgContent={icon} />
                          </div>
                          <p
                            className={`${
                              sidebarCollapsed
                                ? "hidden opacity-0"
                                : "opacity-100"
                            } text-white dark:text-white text-sm font-medium transition-opacity duration-500 opacity-0 ml-2`}
                          >
                            {`${title}s`}
                          </p>
                        </div>
                      </NavLink>
                    ))}
                </div>

                {!sidebarCollapsed && (
                  <div>
                    <div class="bg-custom-gradient text-white p-10 text-md text-center font-medium rounded-md">
                      <p> Get the best Maintenance Service </p>
                      <Button
                        className="bg-white dark:bg-white hover:bg-white text-blue-important mt-8"
                        size="sm"
                      >
                        Go Now
                      </Button>
                    </div>
                  </div>
                )}

                <div>
                  <NavLink
                    key={"/notification"}
                    to={"/notification"}
                    className="block hover:bg-dark-400 dark:hover:bg-dark-400 dark:hover:text-white p-3 rounded-md no-underline"
                    activeClassName="dark:bg-dark-600 dark:text-white bg-activeState"
                  >
                    <div
                      className={`flex items-center gap-x-3 gap-y-1 ${
                        sidebarCollapsed ? "justify-center" : "justify-start"
                      }`}
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20px"
                          viewBox="0 -960 960 960"
                          width="20px"
                          className="fill-white"
                        >
                          <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
                        </svg>
                      </div>
                      <p
                        className={`${
                          sidebarCollapsed ? "hidden opacity-0" : "opacity-100"
                        } text-white dark:text-white text-sm font-medium transition-opacity duration-500 opacity-0 ml-2`}
                      >
                        Notification Settings
                      </p>
                    </div>
                  </NavLink>

                  <div
                    className="block hover:bg-dark-400 dark:hover:bg-dark-400 dark:hover:text-white  p-3 rounded-md no-underline cursor-pointer"
                    onClick={() => setLogoutDialog(true)}
                  >
                    <div
                      className={`flex items-center gap-x-3 gap-y-1 ${
                        sidebarCollapsed ? "justify-center" : "justify-start"
                      }`}
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20px"
                          viewBox="0 -960 960 960"
                          width="20px"
                          className="fill-white"
                        >
                          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                        </svg>
                      </div>
                      <p
                        className={`${
                          sidebarCollapsed ? "hidden" : ""
                        } text-black dark:text-white text-sm font-medium text-white`}
                      >
                        Logout
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <Dialog open={logoutDialog} onClose={setLogoutDialog}>
        <div className=" bg-white dark:bg-dark-100 dark:text-white rounded-md flex-col justify-start items-center gap-6 inline-flex">
          <div className="w-8">
            <Logo />
          </div>

          <div className="flex-col justify-start items-start gap-1 flex">
            <div className="text-[#2F2E33] dark:text-white text-base font-semibold font-['Inter'] leading-snug">
              Log out of your account?
            </div>
          </div>
          <div className="pt-3  sm:flex sm:flex-row-reverse gap-x-3">
            <Button
              className="dark:text-white "
              onClick={() => setLogoutDialog(false)}
            >
              Keep Me Logged In
            </Button>
            <Button
              variant="outline"
              className="dark:text-white"
              onClick={() => setLogoutDialog(false)}
            >
              Logout
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
