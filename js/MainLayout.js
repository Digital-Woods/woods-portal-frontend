const { useSetRecoilState } = Recoil;

const MainLayout = ({ children }) => {
  const { routes, setRoutes } = useRoute();
  const { sidebarCollapsed } = useCollapsible();
  const { Switch, Route, Redirect } = ReactRouterDOM;
  const { me } = useMe();
  const [showPortalMessage, setShowPortalMessage] = useState(false);
  const loggedInDetails = useRecoilValue(userDetailsAtom);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    let userDetails = null;

    if (isLivePreview()) {
      userDetails = fakeUserDetails;
    } else {
      userDetails = loggedInDetails || me;
    }

    if (userDetails && userDetails.hubspotPortals) {
      if (userDetails.sideMenu && userDetails.sideMenu.length > 0) {
        const apiRoutes = userDetails.sideMenu.map((menuItem) => ({
          path: `/${menuItem.name}`,
          title: menuItem.labels.plural,
          icon: menuItem.icon,
          isRequiredAuth: true,
          isHeader: true,
          component: (
            <DynamicComponent
              path={`/${menuItem.name}`}
              title={menuItem.labels.plural}
              icon={menuItem.icon}
            />
          ),
        }));

        setRoutes(apiRoutes);
      } else {
        setRoutes([
          {
            path: "/no-routes",
            title: "No Routes Found",
            icon: "🚫",
            isRequiredAuth: false,
            isHeader: false,
            component: (
              <div className="text-center p-10">
                <h2>No Navigation Available</h2>
                <p>Please check back later.</p>
              </div>
            ),
          },
        ]);
      }
      setIsLoading(false);
    } else if (userDetails && !userDetails.hubspotPortals) {
      setShowPortalMessage(true);
      setIsLoading(false);
    }
  }, [loggedInDetails, me, setRoutes]);

  if (isLoading) {
    return (
      <div className="text-center p-10 w-full h-screen flex items-center justify-center">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (showPortalMessage) {
    return (
      <div className="text-center p-10 w-full h-screen text-3xl font-semibold bg-secondary text-white flex flex-col items-center justify-center">
        <h2>Please Select a HubSpot Portal</h2>
        <p>Before Continuing.</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      {isLoading != false ? (
        <div className="loader-line"></div>
      ) : (
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
                              title={`${title}`}
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
                              title={`${title}`}
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
                        title={`${title}`}
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
                        title={`${title}`}
                        icon={icon}
                      />
                      <DynamicComponent
                        {...props}
                        path={path}
                        title={`${title}`}
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
      )}
    </React.Fragment>
  );
};
