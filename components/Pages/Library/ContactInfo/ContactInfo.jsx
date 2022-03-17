import classes from "./Contact-info.module.css";
import Email from "./Email/Email";
import Schedule from "./Schedule/Schedule";
import Telefon from "./Telefon/Telefon";

const ContactInfo = ({
  scheduleDefault,
  scheduleSecondary,
  email,
  telefon,
}) => (
  <>
    {(scheduleDefault?.schedule ||
      scheduleDefault?.scheduleAup ||
      scheduleSecondary?.schedule ||
      scheduleSecondary?.scheduleAup) && (
      <Schedule
        scheduleDefault={scheduleDefault}
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
