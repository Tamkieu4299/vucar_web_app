/* eslint-disable react-refresh/only-export-components */
import {
  HomeOutlined,
  AudioOutlined,
  UnorderedListOutlined,
  UserOutlined,
  CarOutlined
} from "@ant-design/icons";
import { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AppLayout from "../components/Layout/Layout";
import Loading from "../components/Loading/Loading";
import { LABEL, TEXT } from "../localization/en";
import { getLocalStorage } from "../utils/storage";

const delayRoute = (ms = 500) => {
  return (promise) =>
    promise.then(
      (data) =>
        new Promise((resolve) => {
          setTimeout(() => resolve(data), ms);
        })
    );
};

// eslint-disable-next-line react/prop-types
const RequiredAuth = ({ children, path }) => {
  const location = useLocation();
  return getLocalStorage("tempUser") ? (
    children
  ) : (
    <Navigate to={path} state={{ from: location }} />
  );
};

//Auth Route
// const registerPage = {
//   path: "auth/register",
//   component: lazy(() =>
//     delayRoute()(import("../modules/auth/features/register"))
//   ),
// };
const loginPage = {
  path: "auth/login",
  component: lazy(() => delayRoute()(import("../modules/auth/features/login"))),
};

//Private Route
const homePage = {
  path: "/",
  component: lazy(() => delayRoute()(import("../modules/home/features/home"))),
  title: "Inspectations",
  icon: <UnorderedListOutlined />,
};
const driverPage = {
  path: "/driver-management",
  component: lazy(() =>
    delayRoute()(import("../modules/driver/features/driverPage"))
  ),
  title: "Users",
  icon: <UserOutlined />,
};
const audioPage = {
  path: "/car-management",
  component: lazy(() =>
    delayRoute()(import("../modules/audio/features/audio"))
  ),
  title: "Cars",
  icon: <CarOutlined />,
};
const playlistPage = {
  path: "/playlist-management",
  component: lazy(() =>
    delayRoute()(import("../modules/playlist/features/playlistPage"))
  ),
  title: TEXT.playlist.playlist,
  icon: <UnorderedListOutlined />,
};

export const publicRoutesData = [loginPage];
export const privateRouteData = [homePage, audioPage, driverPage];

const publicRoutes = () => {
  return publicRoutesData.map((route, index) => {
    const { component: Component, path, ...rest } = route;
    return (
      <Route
        {...rest}
        key={`public-route-${index}`}
        path={path}
        element={
          <Suspense fallback={<Loading />}>
            <Component />
          </Suspense>
        }
        exact
      />
    );
  });
};

const privateRoutes = () => {
  return privateRouteData.map((route, index) => {
    const { component: Component, path, title, ...rest } = route;
    return (
      <Route
        {...rest}
        key={`private-route-${index}`}
        path={path}
        element={
          <AppLayout title={title}>
            <RequiredAuth path={"/auth/login"}>
              <Suspense fallback={<Loading />}>
                <Component />
              </Suspense>
            </RequiredAuth>
          </AppLayout>
        }
      />
    );
  });
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes()}
        {privateRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
