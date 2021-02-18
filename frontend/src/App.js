import "react-perfect-scrollbar/dist/css/styles.css";
import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "./components/GlobalStyles";
import "./mixins/chartjs";
import theme from "./theme";
import routes from "./routes";
import fire from "./firebase/Config";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  fire.auth().onAuthStateChanged(user => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });
  const routing = useRoutes(routes(isLoggedIn));
  console.log("logged in?", isLoggedIn);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
