import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import useStore from "../services/store";
import Header from "./Header";
import HomePage from "./HomePage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

const App = () => {
  const toggleLogIn = useStore((state: any) => state.toggleLoggedIn);
  const setToken = useStore((state: any) => state.setJWT);
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    if (token) {
      const jwt = JSON.parse(token);
      setToken(jwt);
      toggleLogIn();
    }
  }, []);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
