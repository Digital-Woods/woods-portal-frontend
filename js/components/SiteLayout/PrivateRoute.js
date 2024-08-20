const { Switch, Route, Redirect } = ReactRouterDOM;

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem(env.AUTH_TOKEN_KEY);

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
