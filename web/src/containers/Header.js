import React from "react"; // get rid of useState if Zustand works
import { Link } from "react-router-dom";
import { Flex, Button, ButtonGroup } from "@chakra-ui/react";

import "../services/styles.css";
import useStore from "../services/store";

const Header = () => {
  const isUserLoggedIn = useStore((state) => state.isUserLoggedIn);
  const toggleLoggedIn = useStore((state) => state.toggleLoggedIn);
  const clearJWT = useStore((state) => state.setJWT);

  const logout = () => {
    clearJWT(null);
    toggleLoggedIn();
    window.localStorage.removeItem("token");
  };

  return (
    <Flex zIndex={1} position="sticky" w="100%" h="50px" align="center" p={8}>
      <Flex flex={1} />
      {isUserLoggedIn ? (
        <Button id="header-button" onClick={logout}>
          <Link to="/">Sign Out</Link>
        </Button>
      ) : (
        <ButtonGroup spacing="6">
          <Button id="header-button">
            <Link to="register">Sign Up</Link>
          </Button>
          <Button id="header-button">
            <Link to="login">Log In</Link>
          </Button>
        </ButtonGroup>
      )}
    </Flex>
  );
};

export default Header;
