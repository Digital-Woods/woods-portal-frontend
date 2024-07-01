const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <SideLayout />
      <div className="w-full bg-light dark:bg-light p-4">
        <HeaderLayout />
        <div className="px-4 py-6">
          <Route path="/sites" component={Sites} />
          <Route path="/recoil-js" component={Recoiljs} />
          <Route path="/tanstack-query" component={TnstackQuery} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/details" component={Details} />
        </div>
      </div>
    </div>
  );
};