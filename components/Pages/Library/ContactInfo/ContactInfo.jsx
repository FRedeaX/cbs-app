import React, { Fragment } from "react";
import classes from "./Contact-info.module.css";
import { Email } from "./Email/Email";
import { Schedule } from "./Schedule/Schedule";
import { Telefon } from "./Telefon/Telefon";

const ContactInfo = (props) => {
  const { schedule, scheduleSecondary, email, telefon } = props;

  return (
    <Fragment>
      {schedule && (
        <Schedule schedule={schedule} scheduleSecondary={scheduleSecondary} />
      )}
      {email && telefon ? (
        <div>
          {email && <Email email={email} cls={classes.link} />}
          {telefon && <Telefon telefon={telefon} cls={classes.link} />}
        </div>
      ) : email ? (
        <Email email={email} cls={classes.link} />
      ) : telefon ? (
        <Telefon telefon={telefon} cls={classes.link} />
      ) : null}
    </Fragment>
  );
};

export default ContactInfo;
