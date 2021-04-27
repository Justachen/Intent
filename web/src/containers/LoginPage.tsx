import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Center, Heading } from "@chakra-ui/react";
import * as Yup from "yup";
import InputField from "../components/InputField";
import { useHistory } from "react-router-dom";

interface LoginPageProps {}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password is too short, minimum of 4 characters"),
})

const LoginPage: React.FC<LoginPageProps> = () => {
  const history = useHistory();

  return (
    <Center>
      <Box mt={8} width={{ base: "80%", md: "40%" }}>
        <Heading mb={8}> Log In Here</Heading>
        <Formik 
          initialValues={{ email: "", password: "" }} 
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            const url = "http://127.0.0.1:5000/api/login"; 
            const response = await fetch(url, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
           // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify(values) // body data type must match "Content-Type" header
            })
            .then(response => {
              console.log(response.json())
            })
            .catch(err => {
              console.log(err)
            });
            history.push("/");
          }}
        >
          {({ values, isSubmitting }) => (
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
