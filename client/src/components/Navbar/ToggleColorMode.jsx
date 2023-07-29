import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDispatch, useSelector } from "react-redux";
import { darkThemeActions } from "../../redux/darkTheme";
import { Fragment } from "react";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const dispatch = useDispatch();
  const flagIsDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.flagIsDarkTheme
  );
  const changeTheme = () => {
    dispatch(darkThemeActions.changeTheme());
  };

  return (
    <Fragment>
      {flagIsDarkTheme} mode
      <IconButton sx={{ ml: 1 }} onClick={changeTheme} color="inherit">
        {flagIsDarkTheme === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Fragment>
  );
}

function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default ToggleColorMode;
