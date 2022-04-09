import { Heading } from "../blocks/Heading/Heading";
import classes from "./Widget.module.css";

const GroupCards = ({ title, description, children }) => (
  <div className={classes.container}>
    {/* {console.log("render GroupCards")} */}
    <div className={classes.head}>
      <Heading level="3" className={classes.title}>
        {title}
      </Heading>
      {description && (
        <span className={classes.description}>{description}</span>
      )}
    </div>
    {children}
  </div>
);

export default GroupCards;
