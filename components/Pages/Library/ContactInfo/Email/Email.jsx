import { Typography } from "@mui/material";
import React from "react";

import classesInfo from "../Contact-info.module.css";

const Email = ({ email, cls }) => (
  <div className={classesInfo.info}>
    {/* {console.log("Email")} */}
    {/* <h4 className={classJoin([classesInfo.title, classes.title])}>E-mail</h4> */}
    <Typography component="h3" className={classesInfo.title}>
      E-mail
    </Typography>
    <a href={`mailto:${email}`} className={cls}>
      {email}
    </a>
  </div>
);

export default Email;
