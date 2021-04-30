import React from "react"; // get rid of useState if Zustand works
import { Link } from "react-router-dom";
import { Flex, Button, ButtonGroup } from "@chakra-ui/react";

import useStore from "../services/store";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const isUserLoggedIn = useStore((state: any) => state.isUserLoggedIn);
  const toggleLoggedIn = useStore((state: any) => state.toggleLoggedIn);
  const clearJWT = useStore((state: any) => state.setJWT);

  const logout = () => {
    clearJWT(null);
    toggleLoggedIn();
    window.localStorage.removeItem("token");
  };

  return (
    <Flex
      zIndex={1}
      position="sticky"
      w="100%"
      h="50px"
      bg="teal"
      align="center"
      p={4}
    >
      <Button variant="link" colorScheme="black">
        <Link to="/">Home</Link>
      </Button>
      <Flex flex={1} />
      {isUserLoggedIn ? (
        <Button variant="link" colorScheme="black" onClick={logout}>
          <Link to="/">Sign Out</Link>
        </Button>
      ) : (
        <ButtonGroup variant="link" colorScheme="black" spacing="6">
          <Button>
            <Link to="register">Sign Up</Link>
          </Button>
          <Button>
            <Link to="login">Log In</Link>
          </Button>
        </ButtonGroup>
      )}
    </Flex>
  );
};

export default Header;
