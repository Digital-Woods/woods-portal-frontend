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
  const { sidebarCollapsed, setSidebarCollapsed } = useCollapsible();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const { routes, setRoutes } = useRoute();

  return (
    <div
      className={`min-h-screen px-6 pt-6 pb-8 transition-width duration-300 bg-white dark:bg-gray-800 hidden lg:block`}
    >
      <div>
        <div className="flex justify-between items-center mb-10">
          <div className="w-[60%] flex items-center">
            <Logo  />
            <h1
              className={`text-xl font-semibold ml-4 text-black dark:text-white ${
                sidebarCollapsed ? "hidden" : "block"
              }`}
            >
              STONBURY
            </h1>
          </div>
          <div className="cursor-pointer" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="dark:fill-white"
            >
              <path d="M280-120 80-320l200-200 57 56-104 104h607v80H233l104 104-57 56Zm400-320-57-56 104-104H120v-80h607L623-784l57-56 200 200-200 200Z" />
            </svg>
          </div>
        </div>
        <nav className="space-y-1">
          {routes.length > 0 &&
            routes.map(({ path, title, icon }) => (
              <NavLink
                key={path}
                to={path}
                className="block hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-white  px-3 py-2.5 rounded-md no-underline"
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
            className="block hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-white  px-3 py-2.5 rounded-md no-underline"
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
  );
};
