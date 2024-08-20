const { BrowserRouter, Route, Link, HashRouter, NavLink } = ReactRouterDOM;
const { RecoilRoot } = Recoil;
const { QueryClientProvider, QueryClient } = ReactQuery;

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false
    },
  },
});

ReactDOM.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Route
          render={() =>
            isAuthenticated() ? (
              <div>
                <MainLayout />
              </div>
            ) : (
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route
                  exact
                  path="/forget-password"
                  component={ForgetPassword}
                />
                <Redirect to="/login" />
              </Switch>
            )
          }
        />
      </HashRouter>
    </QueryClientProvider>
  </RecoilRoot>,
  document.getElementById("app")
);
