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

const SideLayout = () => {
  const [logoutDialog, setLogoutDialog] = useState(false);
  const { sidebarCollapsed, setSidebarCollapsed } = useCollapsible();
  const [isSecondIcon, setIsSecondIcon] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    setIsSecondIcon(!isSecondIcon);
  };

  const { routes, setRoutes } = useRoute();

  return (
    <div
      className={`min-h-screen px-6 pt-6 pb-8 transition-width duration-300 bg-white dark:bg-dark-200 hidden lg:block`}
    >
      <div>
        <div className="flex justify-between items-center mb-10 h-[50px]">
          <div className="flex items-center">
            <div className="mr-2 w-10">
              <Logo />
            </div>

            <h1
              className={`text-lg font-semibold pr-4 pl-1 text-black dark:text-white ${
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
                className="dark:fill-white"
              >
                <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                className="dark:fill-white"
              >
                <path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z" />
              </svg>
            )}
          </div>
        </div>
        <nav className="space-y-1">
          {routes.length > 0 &&
            routes.map(({ path, title, icon }) => (
              <NavLink
                key={path}
                to={path}
                className="block hover:bg-gray-100 dark:hover:bg-dark-300 dark:hover:text-white  px-3 py-2.5 rounded-md no-underline"
                activeClassName="dark:bg-dark-300 dark:text-white bg-gray-100"
              >
                <div
                  className={`flex items-center gap-x-2 ${
                    sidebarCollapsed ? "justify-center" : "justify-start"
                  }`}
                >
                  <div>
                    <SvgRenderer svgContent={icon} />
                  </div>
                  <p
                    className={`${
                      sidebarCollapsed ? "hidden opacity-0" : "opacity-100"
                    } text-black dark:text-white transition-opacity duration-500 opacity-0`}
                  >
                    {title}
                  </p>
                </div>
              </NavLink>
            ))}
          <div>
            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-dark-400" />
          </div>

          <div
            className="block hover:bg-gray-100 dark:hover:bg-dark-300 dark:hover:text-white  px-3 py-2.5 rounded-md no-underline cursor-pointer"
            onClick={() => setLogoutDialog(true)}
          >
            <div
              className={`flex items-center gap-x-2  ${
                sidebarCollapsed ? "justify-center" : "justify-start"
              }`}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  className="dark:fill-white"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                </svg>
              </div>
              <p
                className={`${
                  sidebarCollapsed ? "hidden" : ""
                } text-black dark:text-white`}
              >
                Logout
              </p>
            </div>
          </div>

          <Dialog open={logoutDialog} onClose={setLogoutDialog} >
            <div>
              <div className="pb-4 sm:pb-4" >
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                      id="modal-title"
                    >
                      Logout
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to log out?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-3  sm:flex sm:flex-row-reverse">
                <Button
              variant="destructive"
              className="dark:text-white"
                  onClick={() => setLogoutDialog(false)}
                >
                  Logout
                </Button>
                <Button
                 variant="outline"
                className="dark:text-white mr-3"
                  onClick={() => setLogoutDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Dialog>
        </nav>
      </div>
    </div>
  );
};
