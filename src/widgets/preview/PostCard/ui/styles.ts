import { LoadingButtonProps } from "@mui/lab";

export const sxButton: LoadingButtonProps["sx"] = {
  "@media (min-width: 768px)": {
    position: `absolute`,
    left: 10,
    bottom: 10,
    width: 268,
    backgroundColor: `rgb(255 255 255 / 85%)`,

    "&:hover": {
      backgroundColor: `rgb(255 255 255 / 95%)`,
    },
  },
};
