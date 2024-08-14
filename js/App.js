const { BrowserRouter, Route, Link, HashRouter, NavLink } = ReactRouterDOM;
const { RecoilRoot } = Recoil;
const { QueryClientProvider, QueryClient } = ReactQuery;

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

ReactDOM.render(
  <RecoilRoot>
    <QueryClientProvider client={new QueryClient()}>
      <HashRouter>
        <Route
          render={() =>
            isAuthenticated() ? (
              <MainLayout />
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
