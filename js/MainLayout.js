const MainLayout = ({ children }) => {
  const { routes, setRoutes } = useRoute();
  const { sidebarCollapsed } = useCollapsible();

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
        {routes.length > 0 &&
          routes.map(({ path, title, icon }) => (
            <Route
              key={path}
              path={path}
              render={(props) => (
                <HeaderLayout
                  {...props}
                  path={path}
                  title={`${title}s`}
                  icon={icon}
                />
              )}
            />
          ))}
        <Route
          key={"/notification"}
          path={"/notification"}
          render={(props) => (
            <HeaderLayout
              {...props}
              path={"/notification"}
              title={`Notifications`}
              icon={""}
            />
          )}
        />
        <Route
          key={"/profile"}
          path={"/profile"}
          render={(props) => (
            <HeaderLayout
              {...props}
              path={"/profile"}
              title={`Profile`}
              icon={""}
            />
          )}
        />

        <Switch>
          <PublicRoute
            exact
            path="/login"
            restricted={true}
            component={(props) => (
              <Login {...props} path="/login" title="Login" icon="" />
            )}
          />
          <PublicRoute
            exact
            path="/forget-password"
            restricted={true}
            component={(props) => (
              <ForgetPassword
                {...props}
                path="/forget-password"
                title="Forget Password"
                icon=""
              />
            )}
          />

          {/* Private Routes */}
          <PrivateRoute
            exact
            path="/"
            component={() => (
              <DynamicComponent
                path={routes[0].path}
                title={routes[0].title}
                icon={routes[0].icon}
              />
            )}
          />
          {routes.map(({ path }) => (
            <PrivateRoute
              key={`${path}/:id`}
              path={`${path}/:id`}
              component={(props) => (
                <Details path={path} id={props.match.params.id} />
              )}
            />
          ))}
          {routes.map(({ path, title, icon }) => (
            <PrivateRoute
              key={path}
              path={path}
              component={(props) => (
                <DynamicComponent
                  {...props}
                  path={path}
                  title={`${title}s`}
                  icon={icon}
                />
              )}
            />
          ))}
          <PrivateRoute
            path="/notification"
            component={(props) => (
              <Notification
                {...props}
                path="/notification"
                title="Notifications"
                icon=""
              />
            )}
          />
          <PrivateRoute
            path="/profile"
            component={(props) => (
              <Profile {...props} path="/profile" title="Profile" icon="" />
            )}
          />

          <Redirect to="/login" />
        </Switch>
      </div>
    </div>
  );
};
