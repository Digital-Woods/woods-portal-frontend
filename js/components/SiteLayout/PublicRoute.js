const { Switch, Route, Redirect } = ReactRouterDOM;

const PublicRoute = ({ component: Component, restricted = true, ...rest }) => {
  const token = localStorage.getItem(env.AUTH_TOKEN_KEY);

  return (
    <Route
      {...rest}
      render={(props) =>
        token && restricted ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
