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

  const { Switch, Route } = ReactRouterDOM;

  return (
    <div className="dark:bg-dark-200 flex bg-flatGray h-[100vh]">
      <SideLayout
        className={` duration-300 relative lg:fixed min-h-screen w-full inset-0 lg:w-${
          sidebarCollapsed ? "[100px]" : "[300px]"
        }`}
      />
      <div
        className={`dark:bg-dark-200 bg-flatGray  duration-300 ml-auto w-full lg:w-${
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
        <div className="px-4 py-6">
          {routes.length > 0 && (
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <DynamicComponent
                    {...props}
                    path={routes[0].path}
                    title={routes[0].title}
                    icon={routes[0].icon}
                  />
                )}
              />
              {routes.map(({ path }) => (
                <Route
                  key={`${path}/:id`}
                  path={`${path}/:id`}
                  render={(props) => (
                    <Details path={path} id={props.match.params.id} />
                  )}
                />
              ))}
              {routes.map(({ path, title, icon }) => (
                <Route
                  key={path}
                  path={path}
                  render={(props) => (
                    <DynamicComponent
                      {...props}
                      path={path}
                      title={`${title}s`}
                      icon={icon}
                    />
                  )}
                />
              ))}
              <Route
                path={"/notification"}
                render={(props) => (
                  <Notification
                    {...props}
                    path={"/notification"}
                    title={"Notifications"}
                    icon={""}
                  />
                )}
              />
            </Switch>
          )}
        </div>
      </div>
    </div>
  );
};
