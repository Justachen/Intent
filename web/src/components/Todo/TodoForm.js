import React from "react";
import { Formik, Form } from "formik";
import { Button, VStack } from "@chakra-ui/react";

import useStore from "../../services/store";
import InputField from "../../components/InputField";

const initialValues = { text: "" };

const TodoForm = (props) => {
	const jwt = useStore((state) => state.jwt);
	// const todoInput = useStore((state: any) => state.todoInput);
	// const addTodo = useStore((state: any) => state.addTodo);

	const handleSubmit = (values, resetForm) => {
		props.onSubmit({
			id: Math.floor(Math.random() * 10000),
			user: jwt,
			text: values.text,
		});
		resetForm(initialValues);
	};
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values, { resetForm }) =>
				handleSubmit(values, resetForm)
			}
		>
			{({ values }) => (
				<Form autoComplete="off" style={{ width: "100%" }}>
					<VStack
						mt="2"
						mb="2"
						w="100%"
						alignItems="stretch"
						color="white"
					>
						<InputField
							name="text"
							type="text"
							placeholder="What tasks do you want to do today?"
							variant="flushed"
							color="white"
						/>
						<Button type="submit" colorScheme="teal">
							Add Task
						</Button>
					</VStack>
				</Form>
			)}
		</Formik>
	);
};

export default TodoForm;
