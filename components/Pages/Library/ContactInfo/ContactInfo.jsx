import classes from "./Contact-info.module.css";
import Email from "./Email/Email";
import Schedule from "./Schedule/Schedule";
import Telefon from "./Telefon/Telefon";

const ContactInfo = ({
  schedule,
  scheduleAUP,
  scheduleSecondary,
  email,
  telefon,
}) => (
  <>
    {schedule && (
      <Schedule
        scheduleDefault={schedule}
        scheduleAUP={scheduleAUP}
        scheduleSecondary={scheduleSecondary}
      />
    )}
    {email && telefon ? (
      <div>
        {email && <Email email={email} cls={classes.link} />}
        {telefon && <Telefon telefon={telefon} cls={classes.link} />}
      </div>
    ) : (
      <>
        {email && <Email email={email} cls={classes.link} />}
        {telefon && <Telefon telefon={telefon} cls={classes.link} />}
      </>
    )}
  </>
);

export default ContactInfo;
