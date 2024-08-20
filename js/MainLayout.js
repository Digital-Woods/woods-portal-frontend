const MainLayout = ({ children }) => {
  const { routes, setRoutes } = useRoute();
  const { sidebarCollapsed } = useCollapsible();

  const defaultRoutes = [
    {
      path: `/login`,
      title: "Login",
      icon: "",
      isRequiredAuth: false,
      isHeader: false,
      component: <Login />,
    },
    {
      path: `/forget-password`,
      title: "Forget Password",
      icon: "",
      isRequiredAuth: false,
      isHeader: false,
      component: <ForgetPassword />,
    },
    {
      path: `/notifications`,
      title: "Notifications",
      icon: "",
      isRequiredAuth: true,
      isHeader: true,
      component: <Notification />,
    },
    {
      path: `/profile`,
      title: "Profile",
      icon: "",
      isRequiredAuth: true,
      isHeader: true,
      component: <Profile />,
    },
  ];

  const { data, error, isLoading } = useQuery({
    queryKey: ["features"],
    queryFn: async () => await Client.fetchFeatures.all,
    onSuccess: (response) => {
      const allowedRoutes = ["Asset", "Job", "Site", "Equipment"];
      const apiRoutes = response.data
        .filter((label) => allowedRoutes.includes(label.label))
        .map((label) => ({
          path: `/${label.name}`,
          title: label.label,
          icon: label.icon,
        }));
      setRoutes(apiRoutes);
    },
  });

  if (isLoading) {
    return <div className="loader-line"></div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  const { Switch, Route, Redirect } = ReactRouterDOM;

  return (
    <div className="dark:bg-dark-200 bg-flatGray lg:flex-col flex lg:h-[100vh]">
      <Drawer
        className={`duration-300 relative lg:fixed min-h-screen w-full inset-0 lg:w-${
          sidebarCollapsed ? "[100px]" : "[300px]"
        }`}
      />
      <div
        className={`dark:bg-dark-200 bg-flatGray duration-300 ml-auto w-full lg:w-${
          sidebarCollapsed ? "[calc(100%_-_100px)]" : "[calc(100%_-_300px)]"
        }`}
      >
        <Switch>
          {/* Default Route */}
          {defaultRoutes.map(
            ({ path, title, icon, isRequiredAuth, isHeader, component }) =>
              isRequiredAuth ? (
                <PrivateRoute
                  key={path}
                  path={path}
                  component={(props) => (
                    <React.Fragment>
                      {isHeader && (
                        <HeaderLayout
                          {...props}
                          path={path}
                          title={`${title}s`}
                          icon={icon}
                        />
                      )}
                      {component}
                    </React.Fragment>
                  )}
                />
              ) : (
                <PublicRoute
                  key={path}
                  path={path}
                  component={(props) => (
                    <React.Fragment>
                      {isHeader && (
                        <HeaderLayout
                          {...props}
                          path={path}
                          title={`${title}s`}
                          icon={icon}
                        />
                      )}
                      {component}
                    </React.Fragment>
                  )}
                />
              )
          )}

          {/* Root Route */}
          <PrivateRoute
            exact
            path="/"
            component={() => (
              <React.Fragment>
                <HeaderLayout
                  path={routes[0].path}
                  title={routes[0].title}
                  icon={routes[0].icon}
                />
                <DynamicComponent
                  path={routes[0].path}
                  title={routes[0].title}
                  icon={routes[0].icon}
                />
              </React.Fragment>
            )}
          />

          {/* Details Routs */}
          {routes.map(({ path, title, icon }) => (
            <PrivateRoute
              key={`${path}/:id`}
              path={`${path}/:id`}
              component={(props) => (
                <React.Fragment>
                  <HeaderLayout
                    {...props}
                    path={path}
                    title={`${title}s`}
                    icon={icon}
                  />
                  <Details path={path} id={props.match.params.id} />
                </React.Fragment>
              )}
            />
          ))}

          {/* List Routs */}
          {routes.map(({ path, title, icon }) => (
            <PrivateRoute
              key={path}
              path={path}
              component={(props) => (
                <React.Fragment>
                  <HeaderLayout
                    {...props}
                    path={path}
                    title={`${title}s`}
                    icon={icon}
                  />
                  <DynamicComponent
                    {...props}
                    path={path}
                    title={`${title}s`}
                    icon={icon}
                  />
                </React.Fragment>
              )}
            />
          ))}

          <Redirect to="/login" />
        </Switch>
      </div>
    </div>
  );
};
