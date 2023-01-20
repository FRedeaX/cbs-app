import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import {
  Box,
  Button,
  Container,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { FC, ReactNode, useState } from "react";

import { FilterCleare } from "../../../../components/Search/components/Filter/components/Filter.Cleare/Filter.Cleare";
import { declOfNum } from "../../../../helpers";
import {
  CSSProperties,
  Maybe,
} from "../../../../helpers/typings/utility-types";
import {
  sxAsideFilterButton,
  sxAsideHeader,
  sxAsidePaper,
  sxAsideTypography,
} from "../../style";
import classes from "./Aside.Touch.module.css";

type AsideTouchProps = {
  children: ReactNode;
  count: Maybe<number>;
};

const formatResult = declOfNum(["результат", "результата", "результатов"]);
const sxControls: CSSProperties = {
  display: "flex",
  paddingBottom: "10px",
};
const sxButtonCleare: CSSProperties = {
  flexShrink: 0,
  marginRight: "15px",
};

export const AsideTouch: FC<AsideTouchProps> = ({ children, count }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="text"
        size="small"
        endIcon={<TuneRoundedIcon />}
        sx={sxAsideFilterButton}
        onClick={() => setOpen(true)}>
        Фильтры
      </Button>
      <SwipeableDrawer
        anchor="bottom"
        disableSwipeToOpen
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={isOpen}
        PaperProps={{ sx: sxAsidePaper }}>
        <Box sx={sxAsideHeader} className={classes.header}>
          <Typography component="h2" align="center" sx={sxAsideTypography}>
            Фильтры
          </Typography>
        </Box>
        <Container className={classes.drawer}>{children}</Container>
        <Container sx={sxControls} className={classes.controls}>
          <FilterCleare sx={sxButtonCleare}>Сбросить</FilterCleare>

          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={() => setOpen(false)}>
            <Typography component="span" variant="inherit" noWrap>
              {count ? `Показать ${count} ${formatResult(count)}` : "Закрыть"}
            </Typography>
          </Button>
        </Container>
      </SwipeableDrawer>
    </>
  );
};
