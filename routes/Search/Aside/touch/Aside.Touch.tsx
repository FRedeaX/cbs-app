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
import { Maybe } from "../../../../helpers/typings/utility-types";
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
        <Container className={classes.controls}>
          <FilterCleare className={classes.cleare}>Сбросить</FilterCleare>

          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={() => setOpen(false)}>
            {count ? `Показать ${count} ${formatResult(count)}` : "Закрыть"}
          </Button>
        </Container>
      </SwipeableDrawer>
    </>
  );
};
