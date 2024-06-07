import {
  BrowserRouter,
  Link,
  NavLink,
  Routes,
  Route,
  Outlet,
  useParams,
  useLocation,
  useNavigate
} from "https://cdn.skypack.dev/react-router-dom";


const AuthRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/about",
      element: <About />,
    },
  ],
};

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
  ],
};

const { useRoutes } = ReactRouterDOM;
// ==============================|| ROUTING RENDER ||============================== //

const Routes = () => {
  return useRoutes([MainRoutes, AuthRoutes]);
};

export default Routes;