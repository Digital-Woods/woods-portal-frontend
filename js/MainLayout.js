const MainLayout = ({ children }) => {
  const { routes, setRoutes } = useRoute();

  const apiroutes = [
    {
      path: "/sites",
      title: "Sites",
      icon: "icon",
    },
    {
      path: "/dashboard",
      title: "Dashboard",
      icon: "icon",
    },
  ];

  useEffect(() => {
    setRoutes(apiroutes);
  }, []);

  return (
    <div className="flex">
      <SideLayout />
      <div className="w-full bg-light dark:bg-gray-800 p-4">
        <HeaderLayout />
        <div className="px-4 py-6">
          {routes.length > 0 &&
            routes.map(({ path, title, icon }) => (
              <Route
                key={path}
                path={path}
                render={(props) => (
                  <Details {...props} path={path} title={title} icon={icon} />
                )}
              />
            ))} 
            
        </div>
      </div>
    </div>
  );
};
