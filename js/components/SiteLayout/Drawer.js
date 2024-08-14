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

const Drawer = ({ className }) => {
  const [logoutDialog, setLogoutDialog] = useState(false);
  const { sidebarCollapsed, setSidebarCollapsed } = useCollapsible();
  const [isSecondIcon, setIsSecondIcon] = useState(false);
  const { sidebarOpen, setSidebarOpen } = useCollapsible();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    setIsSecondIcon(!isSecondIcon);
  };

  const { routes, setRoutes } = useRoute();

  const mutation = useMutation({
    mutationFn: (data) => HttpClient.post(API_ENDPOINTS.USER_LOGOUT, data),
    onSuccess: () => {
      setLogoutDialog(false);
      window.location.href = "/login";
    },
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    // mutation.mutate();
    window.location.href =
      "https://40123182.hubspotpreview-na1.com/_hcms/preview/template/multi?businessUnitId=0&domain=undefined&hs_preview_key=RaEtwtEoZVNXOTtUvBPiWQ&portalId=40123182&tc_deviceCategory=undefined&template_file_path=Membership+Setup%2Ftemplates%2Flayouts%2Fbase.html&updated=1719810875343&#/login";
    setLogoutDialog(false);
  };

  return (
    <div>
      {sidebarOpen && (
        <div className="relative z-[10]">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity lg:hidden"
            aria-hidden="true"
            onClick={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}
      <div className={className}>
        <div
          className={`h-[100vh] z-50 sidebar bg-sidelayoutColor dark:bg-dark-300 lg:relative lg:translate-x-0 absolute inset-y-0 left-0 transform transition duration-200 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }
          ${sidebarCollapsed ? "p-3" : "p-4"}
          `}
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
                className="cursor-pointer flex items-center md:hidden lg:block"
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
              <div
                className=" rounded-lg cursor-pointer  bg-gray-600 px-2 py-1 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  className="fill-white"
                >
                  <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
                </svg>
              </div>
            </div>
            <nav className="space-y-1 flex-1">
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
                        } text-white dark:text-white text-sm font-medium transition-opacity duration-500 opacity-0`}
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
      <Dialog open={logoutDialog} onClose={() => setLogoutDialog(false)}>
        <div className="bg-white dark:bg-dark-100 dark:text-white rounded-md flex-col justify-start items-center gap-6 inline-flex">
          <div className="w-8">
            <Logo />
          </div>

          <div className="flex-col justify-start items-start gap-1 flex">
            <div className="text-[#2F2E33] dark:text-white text-base font-semibold font-['Inter'] leading-snug">
              Log out of your account?
            </div>
          </div>
          <div className="pt-3 sm:flex sm:flex-row-reverse gap-x-3">
            <Button
              className="dark:text-white"
              onClick={() => setLogoutDialog(false)}
            >
              Keep Me Logged In
            </Button>
            <Button
              variant="outline"
              className="dark:text-white"
              onClick={handleLogout}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
