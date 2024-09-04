const { Switch, Route, Redirect } = ReactRouterDOM;

const PublicRoute = ({ component: Component, restricted = true, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
