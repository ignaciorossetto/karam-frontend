import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import ResponsiveHeader from "../Header/ResponsiveHeader/ResponsiveHeader";

const PageLayout = () => (
  <>
    <ResponsiveHeader />
    <Outlet />
  </>
);

export default PageLayout
