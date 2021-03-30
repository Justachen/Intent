import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Center, Heading } from "@chakra-ui/react";
import InputField from "../components/InputField";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  return (
    <Center>
      <Box mt={8} width={{ base: "80%", md: "40%" }}>
        <Heading mb={8}> Log In Here</Heading>
        <Formik initialValues={{ email: "", password: "" }} onSubmit={() => {}}>
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="email"
                label="Email"
                type="email"
                placeholder="johndoe@gmail.com"
              />
              <Box mt={4} />
              <InputField
                name="password"
                label="Password"
                type="password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              />
              <Button
                mt={8}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Log In
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
};

export default LoginPage;
