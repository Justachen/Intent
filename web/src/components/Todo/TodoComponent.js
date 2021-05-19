import React, { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import "../../services/styles.css";

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoComponent = () => {
	const [todos, setTodos] = useState([]);

	const addTodo = (todo) => {
		if (!todo.text || /^\s*$/.test(todo.text)) {
			return;
		}

		const newTodos = [todo, ...todos];
		setTodos(newTodos);
	};

	const completeTodo = (id) => {
		let updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.isComplete = !todo.isComplete;
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	const editTodo = (id, newValue) => {
		if (!newValue.text || /^\s*$/.test(newValue.text)) {
			return;
		}
		setTodos((prev) =>
			prev.map((item) => (item.id === id ? newValue : item))
		);
	};

	const removeTodo = (id) => {
		const removeArr = [...todos].filter((todo) => todo.id !== id);
		setTodos(removeArr);
	};

	return (
		<Box className="todo-card">
			<Heading
				className="todo-header"
				mt={4}
				color="white"
				align="center"
			>
				What's the Plan Today?
			</Heading>
			<TodoForm onSubmit={addTodo} />
			<TodoList
				todos={todos}
				completeTodo={completeTodo}
				removeTodo={removeTodo}
				editTodo={editTodo}
			/>
		</Box>
	);
};

export default TodoComponent;
