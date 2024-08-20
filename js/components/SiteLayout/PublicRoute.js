const { Switch, Route, Redirect } = ReactRouterDOM;

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const token = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) =>
        token && restricted ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
