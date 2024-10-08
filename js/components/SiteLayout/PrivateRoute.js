const { Switch, Route, Redirect } = ReactRouterDOM;

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() || env.DATA_SOURCE_SET === true  ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
