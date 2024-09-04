const { BrowserRouter, Route, Link, HashRouter, NavLink } = ReactRouterDOM;
const { RecoilRoot } = Recoil;
const { QueryClientProvider, QueryClient } = ReactQuery;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    },
  },
});

function App() {
  useEffect(() => {
    setColorsFromLocalStorage();
  }, []);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
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
    </RecoilRoot>
  );
}

// Render the App component
ReactDOM.render(<App />, document.getElementById("app"));
