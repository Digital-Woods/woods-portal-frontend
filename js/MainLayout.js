const MainLayout = ({ children }) => {
  const { routes, setRoutes } = useRoute();
  const { sidebarCollapsed } = useCollapsible();
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["features"],
    queryFn: async () => await Client.fetchFeatures.all,
    onSuccess: (response) => {
      const apiRoutes = response.data.map((label) => ({
        path: `/${label.name}`,
        title: label.label,
        icon: label.icon,
      }));
      setRoutes(apiRoutes);
    },
  });

  console.log();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="flex dark:bg-gray-800 bg-white">
      <div className={`lg:w-${sidebarCollapsed ? "[100px]" : "[250px]"} transition-[width] duration-300`}>
        <SideLayout />
      </div>

      <div
        className={`lg:w-${
          sidebarCollapsed ? "[calc(100%_-_100px)]" : "[calc(100%_-_250px)]"
        } w-[100%] dark:bg-gray-800 lg:p-4 p-1 lg:h-full h-screen  transition-[width] duration-300`}
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
                    title={title}
                    icon={icon}
                  />
                )}
              />
            ))}
        <div className="px-4 py-6">
          {routes.length > 0 && (
            <div>
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
              {routes.map(({ path, title, icon }) => (
                <Route
                  key={path}
                  path={path}
                  render={(props) => (
                    <DynamicComponent
                      {...props}
                      path={path}
                      title={title}
                      icon={icon}
                    />
                  )}
                />
              ))}
            </div>
          )}
          <Route
            key="/details"
            path="/details/:feature/:id"
            render={(props) => (
              <Details
                id={props.match.params.id}
                path={props.match.params.feature}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
