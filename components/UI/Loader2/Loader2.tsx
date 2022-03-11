import CircularProgress from "@mui/material/CircularProgress";
import classNames from "classnames";
import classes from "./Loader2.module.css";

interface ILoader {
  isLoading?: boolean;
}

const Loader2 = ({ isLoading = false }: ILoader): JSX.Element => {
  return (
    <div
      className={classNames(classes.wrapper, {
        [classes.wrapper_hidden]: isLoading === false,
      })}>
      <CircularProgress className={classes.circular_progress} />
    </div>
  );
};

export default Loader2;
