import classNames from "classnames";

import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Loader from "../Loader/Loader";
import classes from "./Layout.module.css";

const Layout = ({
  menu,
  loading = false,
  size = "l",
  paddingSides = false,
  children,
}) => (
  <>
    <Header menus={menu} />
    <main
      style={{ paddingLeft: paddingSides, paddingRight: paddingSides }}
      className={classNames(classes.main, classes[`main_size_${size}`])}>
      {loading ? <Loader isFullscreen /> : children}
    </main>
    <Footer />
  </>
);

export default Layout;
