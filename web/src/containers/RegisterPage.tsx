import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Center, Heading } from "@chakra-ui/react";
import InputField from "../components/InputField";

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  return (
    <Center>
      <Box mt={8} width={{ base: "80%", md: "40%" }}>
        <Heading mb={8}> Sign Up Here</Heading>
        <Formik
          initialValues={{ email: "", password: "", confirm: "" }}
          onSubmit={(values) => {
            alert(JSON.stringify(values));
          }}
        >
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
              <Box mt={4} />
              <InputField
                name="confirm"
                label="Confirm Password"
                type="password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              />

              <Button
                mt={8}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
};

export default RegisterPage;
