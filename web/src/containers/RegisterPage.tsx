import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Center, Heading } from "@chakra-ui/react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import InputField from "../components/InputField";
import { emailUsed } from "../utils/validation";

interface RegisterPageProps {}

const badEmail = (email: any) =>
  email === undefined ||
  email.length < 5 ||
  !email.includes("@") ||
  !email.includes(".");

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid")
    .required("Email is required")
    .test("canUseEmail", "Email is already in use", async (value: any) => {
      if (badEmail(value)) return false;
      const res = await emailUsed(value.toLowerCase());
      const user = await res.json();
      return !user.exists;
    }),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password is too short, minimum of 4 characters"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const history = useHistory();

  return (
    <Center>
      <Box mt={8} width={{ base: "80%", md: "40%" }}>
        <Heading mb={8}> Sign Up Here</Heading>
        <Formik
          initialValues={{ email: "", password: "", confirm: "" }}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            const { confirm, ...body } = values;
            const url = "http://127.0.0.1:5000/api/user";
            await fetch(url, {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify(body), // body data type must match "Content-Type" header
            });
            history.push("login");
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <InputField
                name="email"
                label="Email"
                aria-label="Email"
                type="email"
                placeholder="johndoe@gmail.com"
              />
              <Box mt={4} />
              <InputField
                name="password"
                label="Password"
                aria-label="Password"
                type="password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              />
              <Box mt={4} />
              <InputField
                name="confirm"
                label="Confirm Password"
                aria-label="Password"
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
