import classNames from "classnames";
import { memo } from "react";
import classes from "./Layout.module.css";
import Header from "~/components/Header/Header";
import Loader from "~/components/UI/Loader/Loader";
import Footer from "~/components/Footer/Footer";

const Layout = ({ menu, loading, size = "l", paddingSides, children }) => (
  <>
    <Header menus={menu} />
      <main
        style={{ paddingLeft: paddingSides, paddingRight: paddingSides }}
        className={classNames(classes.main, classes[`main_size_${size}`])}
        >
          {loading ? <Loader isFullscreen={true} /> : children}
      </main>
    <Footer />
  </>
);

export default memo(Layout);
