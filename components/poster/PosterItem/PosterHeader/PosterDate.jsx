import classNames from "classnames";
import classes from "./PosterDate.module.css";

const PosterDate = ({ dateStart, dateEnd }) => {
  if (dateStart.month !== dateEnd.month) {
    return (
      <>
        <div className={classes.block}>
          с <span className={classNames(classes.date)}>{dateStart.day}</span>
          <span className={classNames(classes.month, classes.month_padding)}>
            {dateStart.monthText}
          </span>
        </div>
        <div className={classes.block}>
          по <span className={classNames(classes.date)}>{dateEnd.day}</span>
          <span className={classNames(classes.month, classes.month_padding)}>
            {dateEnd.monthText}
          </span>
        </div>
      </>
    );
  }

  return (
    <div className={classNames(classes.block, classes.block_one_month)}>
      <span
        className={classNames(classes.date, {
          [classes.date_size_small]: dateEnd.day !== null,
        })}>
        {dateEnd.day !== null
          ? `${dateStart.day}-${dateEnd.day}`
          : dateStart.day}
      </span>
      <span className={classes.month}>{dateStart.monthText}</span>
    </div>
  );
};

export default PosterDate;
