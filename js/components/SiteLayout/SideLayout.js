const { useState } = React;

const NavLink = ({ to, className, activeClassName, children }) => {
  return (
    <NavLink
      to={to}
      className={`block hover:bg-primary p-3 hover:text-white rounded-md no-underline ${className}`}
      activeClassName={activeClassName}
    >
      {children}
    </NavLink>
  );
};

const SideLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div
      className={`w-${
        sidebarCollapsed ? "1/12" : "1/4"
      } min-h-screen px-6 pt-6 pb-8 transition-width duration-300`}
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="w-[50%] flex items-center">
            <Logo src="https://s3-media0.fl.yelpcdn.com/bphoto/dQaSKYTZdGzL7FNP3HcRCQ/348s.jpg" />
            <h1
              className={`text-xl font-semibold ml-4 ${
                sidebarCollapsed ? "hidden" : "block"
              }`}
            >
              STONBURY
            </h1>
          </div>
          <div className="cursor-pointer" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 16L1 11L6 6"
                stroke="#525259"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 16L8 11L13 6"
                stroke="#525259"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <nav className="space-y-1">
          <NavLink
            to="/home"
            className="block hover:bg-primary p-3 hover:text-white rounded-md no-underline"
            activeClassName="bg-primary text-white"
          >
            <div className="flex items-center gap-x-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="white"
                >
                  <path
                    d="M6.66667 2H2V6.66667H6.66667V2Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.0002 2H9.3335V6.66667H14.0002V2Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.0002 9.33337H9.3335V14H14.0002V9.33337Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66667 9.33337H2V14H6.66667V9.33337Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className={`${sidebarCollapsed ? "hidden" : ""}`}>Sites</p>
            </div>
          </NavLink>
          <NavLink
            to="/recoil-js"
            className="block hover:bg-primary p-3 hover:text-white rounded-md no-underline"
            activeClassName="bg-primary text-white"
          >
            <div className="flex items-center gap-x-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="white"
                >
                  <path
                    d="M6.66667 2H2V6.66667H6.66667V2Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.0002 2H9.3335V6.66667H14.0002V2Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.0002 9.33337H9.3335V14H14.0002V9.33337Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66667 9.33337H2V14H6.66667V9.33337Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className={`${sidebarCollapsed ? "hidden" : ""}`}>Assets</p>
            </div>
          </NavLink>
          <NavLink
            to="/tanstack-query"
            className="block hover:bg-primary p-3 hover:text-white rounded-md no-underline"
            activeClassName="bg-primary text-white"
          >
            <div className="flex items-center gap-x-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="white"
                >
                  <path
                    d="M6.66667 2H2V6.66667H6.66667V2Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.0002 2H9.3335V6.66667H14.0002V2Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.0002 9.33337H9.3335V14H14.0002V9.33337Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66667 9.33337H2V14H6.66667V9.33337Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className={`${sidebarCollapsed ? "hidden" : ""}`}>Jobs</p>
            </div>
          </NavLink>
          <div>
            <hr className="h-px my-1 bg-gray-100 border-0 dark:bg-gray-700" />
          </div>
          <NavLink
            to="/logout"
            className="block hover:bg-primary p-3 hover:text-white rounded-md no-underline"
            activeClassName="bg-primary text-white"
          >
            <div className="flex items-center gap-x-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="white"
                >
                  <path
                    d="M6.66667 2H2V6.66667H6.66667V2Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.0002 2H9.3335V6.66667H14.0002V2Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.0002 9.33337H9.3335V14H14.0002V9.33337Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66667 9.33337H2V14H6.66667V9.33337Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className={`${sidebarCollapsed ? "hidden" : ""}`}>Log Out</p>
            </div>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};
