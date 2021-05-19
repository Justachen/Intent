import React, { useState } from "react";
import {
	Box,
	CloseButton,
	Center,
	VStack,
	HStack,
	StackDivider,
	Spacer,
	Badge,
	Circle,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import TodoForm from "./TodoForm";

const TodoList = ({ todos, completeTodo, removeTodo, editTodo }) => {
	const [edit, setEdit] = useState({
		id: null,
		value: "",
	});

	const submitEdit = (value) => {
		editTodo(edit.id, value);
		setEdit({
			id: null,
			value: "",
		});
	};

	if (edit.id) {
		return <TodoForm edit={edit} onSubmit={submitEdit} />;
	}

	if (!todos.length) {
		return (
			<Center>
				<Badge colorScheme="orange" p="4" m="4" borderRadius="lg">
					No Tasks in your Todos!
				</Badge>
			</Center>
		);
	}

	return (
		<VStack
			divider={<StackDivider />}
			borderColor="cyan"
			borderWidth={2}
			borderRadius="lg"
			p={4}
			w="100%"
			maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
			alignItems="stretch"
			color="white"
		>
			{todos.map((todo, index) => (
				<HStack
					className={
						todo.isComplete ? "todo-row complete" : "todo-row"
					}
					key={todo.id}
				>
					<Box key={index} onClick={() => completeTodo(todo.id)}>
						{console.log(index)}
						{todo.text}
					</Box>
					<Spacer />
					<Circle size="30px" bg="tomato">
						<CloseButton
							size="sm"
							className="delete-icon"
							onClick={() => removeTodo(todo.id)}
						/>
					</Circle>
					<Circle size="30px" bg="tomato">
						<EditIcon
							size="sm"
							className="edit-icon"
							onClick={() =>
								setEdit({ id: todo.id, value: todo.text })
							}
						/>
					</Circle>
				</HStack>
			))}
		</VStack>
	);
};

export default TodoList;
