import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { FC, PropsWithChildren } from "react";

import { lightTheme } from "@/styles/theme/lightTheme";

export const Providers: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <AppRouterCacheProvider>
    <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
  </AppRouterCacheProvider>
);
