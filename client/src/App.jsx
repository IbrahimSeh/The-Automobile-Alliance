import React, { useEffect, useState } from "react";
import Progress from "./components/Progress/progressBar";
import {
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  CircularProgress,
} from "@mui/material";

//redux
import { useSelector } from "react-redux";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// css
import "./css/App.css";
import "./css/BCarFooter.css";

import useLoggedIn from "./hooks/useLoggedIn";
import Router from "./routes/Router";

// components
import NavBar from "./components/Navbar/Navbar";
import BCarFooter from "./components/Footer/BCarFooter";

const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const loggedIn = useLoggedIn();
  const [scrollPostion, setState] = useState(0);
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  useEffect(() => {
    (async () => {
      await loggedIn();
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    listenToScrollEvent();
  }, []);

  const listenToScrollEvent = () => {
    document.addEventListener("scroll", () => {
      requestAnimationFrame(() => {
        calculateScrollDistance();
      });
    });
  };

  const calculateScrollDistance = () => {
    const scrollTop = window.pageYOffset; // how much the user has scrolled by
    const winHeight = window.innerHeight;
    const docHeight = getDocHeight();

    const totalDocScrollLength = docHeight - winHeight;
    setState(Math.floor((scrollTop / totalDocScrollLength) * 100));
  };

  const getDocHeight = () => {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
  };

  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Container>
        <Progress scroll={scrollPostion + "%"} />
        <header>
          <NavBar />
        </header>
        <main>{isLoading ? <CircularProgress /> : <Router />}</main>
        <footer>
          <BCarFooter />
        </footer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
