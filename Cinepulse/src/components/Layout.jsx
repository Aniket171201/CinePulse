// import React from "react";
// import { useLocation } from "react-router-dom";
// import Header from "../components/Main/Header";
// import SubHeader from "./SubHeader/SubHeader";
// import Scroll from "./Main/Scroll";
// import Footer from "./Main/Footer";

// const Layout = ({ children, onSearch }) => {
//   const location = useLocation();
//   const noScrollRoutes = [
//     "/login",
//     "/signup",
//     "/moviesdesc",
//     "/todayshow",
//     "/booking",
//     "/bookingsummary",
//     "/forgot-password",
//     "/reset-password",
//     "/manager-dashboard",
//     "/admin-dashboard",
//     "/update-cinemaHall/:id",
//     "/associate-movie/:id",
//     "/add-show/:id",
//     "/update-movie/:movieId",
//   ];
//   const noHeaderFooterRoutes = [
//     "/login",
//     "/signup",
//     "/bookingsummary",
//     "/booking",
//     "/forgot-password",
//     "/reset-password",
//     "/manager-dashboard",
//     "/admin-dashboard",
//     "/update-cinemaHall/:id",
//     "/associate-movie/:id",
//     "/add-show/:id",
//     "/update-movie/:movieId",
//   ];

//   const shouldRenderHeaderFooter = !noHeaderFooterRoutes.includes(
//     location.pathname
//   );
//   const shouldRenderScroll = !noScrollRoutes.includes(location.pathname);

//   return (
//     <>
//       {shouldRenderHeaderFooter && <Header onSearch={onSearch} />}
//       {shouldRenderHeaderFooter && <SubHeader />}
//       {shouldRenderScroll && <Scroll />}
//       {children}
//       {shouldRenderHeaderFooter && <Footer />}
//     </>
//   );
// };

// export default Layout;

import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Main/Header";
import SubHeader from "./SubHeader/SubHeader";
import Scroll from "./Main/Scroll";
import Footer from "./Main/Footer";

const Layout = ({ children, onSearch }) => {
  const location = useLocation();

  const noScrollRoutes = [
    "/login",
    "/signup",
    "/moviesdesc",
    "/todayshow",
    "/booking",
    "/bookingsummary",
    "/forgot-password",
    "/reset-password",
    "/manager-dashboard",
    "/admin-dashboard",
  ];

  const noHeaderFooterRoutes = [
    "/login",
    "/signup",
    "/bookingsummary",
    "/booking",
    "/forgot-password",
    "/reset-password",
    "/manager-dashboard",
    "/admin-dashboard",
  ];

  const isDynamicRoute = (basePath) => {
    return location.pathname.startsWith(basePath);
  };

  const shouldRenderHeaderFooter = !(
    noHeaderFooterRoutes.includes(location.pathname) ||
    isDynamicRoute("/update-cinemaHall/") ||
    isDynamicRoute("/associate-movie/") ||
    isDynamicRoute("/add-show/") ||
    isDynamicRoute("/update-movie/")
  );

  const shouldRenderScroll = !(
    noScrollRoutes.includes(location.pathname) ||
    isDynamicRoute("/update-cinemaHall/") ||
    isDynamicRoute("/associate-movie/") ||
    isDynamicRoute("/add-show/") ||
    isDynamicRoute("/update-movie/")
  );

  return (
    <>
      {shouldRenderHeaderFooter && <Header onSearch={onSearch} />}
      {shouldRenderHeaderFooter && <SubHeader />}
      {shouldRenderScroll && <Scroll />}
      {children}
      {shouldRenderHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
