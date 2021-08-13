import React from "react";
import { Heading } from "../../../../blocks/Heading/Heading";
import classesInfo from "../Contact-info.module.css";

export const Email = ({ email, cls }) => {
  return (
    <div className={classesInfo.info}>
      {/* {console.log("Email")} */}
      {/* <h4 className={classJoin([classesInfo.title, classes.title])}>E-mail</h4> */}
      <Heading level={4} className={classesInfo.title}>
        E-mail
      </Heading>
      <a href={`mailto:${email}`} className={cls}>
        {email}
      </a>
    </div>
  );
};
