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
import { useDispatch, useSelector } from "react-redux";

// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// css
import "./css/App.css";
import "./css/BCarFooter.css";

import useLoggedIn from "./hooks/useLoggedIn";
import Router from "./routes/Router";

// components
import NavBar from "./components/Navbar/Navbar";
import BCarFooter from "./components/Footer/BCarFooter";
import useNumberOfRequest from "./hooks/useNumberOfRequest";
import { authActions } from "./redux/auth";

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
  const [mousePos, setMousePos] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const loggedIn = useLoggedIn();
  const numberOfRequest = useNumberOfRequest();
  const [scrollPostion, setState] = useState(0);
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await loggedIn();
      await numberOfRequest();
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    listenToScrollEvent();
  }, []);

  // var timeoutHandle = setTimeout(() => {
  //   localStorage.removeItem("token");
  //   dispatch(authActions.logout());
  //   toast.warning("Delayed for 4 second you are logged out automatically.");
  // }, "4000");

  useEffect(() => {
    const handleMouseMove = (event) => {
      console.log("mouse moved");
      //window.clearTimeout(timeoutHandle);
    };
    const handleKeyPress = (event) => {
      console.log("key board pressed");
      //window.clearTimeout(timeoutHandle);
    };
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("keydown", handleKeyPress);
    // return () => {
    //   window.removeEventListener("mousemove", handleMouseMove);
    //   document.removeEventListener("onkeydown", handleKeyPress);
    // };
  }, []);

  //1000*60*60*4=4 houre => 14400000
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
