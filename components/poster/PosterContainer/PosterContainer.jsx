import React from "react";
import SectionHeader from "../../SectionHeader/SectionHeader";
import classes from "./Poster-container.module.css";

const PosterContainer = ({ children }) => (
  <>
    <SectionHeader>Анонсы</SectionHeader>
    <div className={classes.wrapper}>{children}</div>
  </>
);

export default PosterContainer;
