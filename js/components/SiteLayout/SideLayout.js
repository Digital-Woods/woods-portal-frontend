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
  const [isSecondIcon, setIsSecondIcon] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    setIsSecondIcon(!isSecondIcon);
  };

  const { routes, setRoutes } = useRoute();

  return (
    <div
      className={`min-h-screen px-6 pt-6 pb-8 transition-width duration-300 bg-white dark:bg-gray-800 hidden lg:block`}
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
          <div className="cursor-pointer flex items-center" onClick={toggleSidebar}>
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
                className="block hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-white  px-3 py-2.5 rounded-md no-underline"
                activeClassName="dark:bg-gray-900 dark:text-white bg-gray-100"
              >
                <div className={`flex items-center gap-x-2 ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
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
            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
          </div>
          <NavLink
            to="/logout"
            className="block hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-white  px-3 py-2.5 rounded-md no-underline"
            activeClassName="dark:bg-gray-900 dark:text-white bg-gray-100"
          >
            <div className={`flex items-center gap-x-2  ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="dark:fill-white"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
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
