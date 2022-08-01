import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";

export const ColorModeContext = React.createContext({
  toggleColorMode: (mode: any) => {},
});

export default function AppMode() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: (mode: React.SetStateAction<"light" | "dark">) => {
        setMode(mode);
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            light: "#212121",
            main: mode === "light" ? "#424242" : "#fff",
            dark: "#90caf9",
          },
          secondary: {
            light: "#212121",
            main: mode === "light" ? "#424242" : "#fff",
            dark: "#90caf9",
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
