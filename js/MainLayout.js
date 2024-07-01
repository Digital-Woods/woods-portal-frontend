const MainLayout = ({ children }) => {
  const routes = [
    {
      path: "/sites",
      component: Sites,
      title: "Sites",
      description: "Manage your sites",
    },
    {
      path: "/recoil-js",
      component: Recoiljs,
      title: "Recoil JS",
      description: "Learn about Recoil JS",
    },
    {
      path: "/tanstack-query",
      component: TnstackQuery,
      title: "TanStack Query",
      description: "Learn about TanStack Query",
    },
    {
      path: "/login",
      component: Login,
      title: "Login",
      description: "Login to your account",
    },
    {
      path: "/register",
      component: Register,
      title: "Register",
      description: "Register a new account",
    },
    {
      path: "/details",
      component: Details,
      title: "Details",
      description: "View details",
    },
  ];
  return (
    <div className="flex">
      <SideLayout />
      <div className="w-full bg-light dark:bg-light p-4">
        <HeaderLayout />
        <div className="px-4 py-6">
          {routes.map(({ path, component: Component, title, description }) => (
            <Route
              key={path}
              path={path}
              render={(props) => (
                <Component {...props} title={title} description={description} />
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
