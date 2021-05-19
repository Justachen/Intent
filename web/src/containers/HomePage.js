import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Center, Heading, VStack, HStack } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import "../services/styles.css";
import Header from "./Header";
import { ReactComponent as WelcomeImage } from "../assets/welcome.svg";
import useStore from "../services/store";
import TodoComponent from "../components/Todo/TodoComponent";
import PomodoroComponent from "../components/Pomodoro/PomodoroComponent";

const HomePage = () => {
	const isUserLoggedIn = useStore((state) => state.isUserLoggedIn);
	const [toggleTodo, setToggleTodo] = useState(false);

	const updateToggle = (val) => {
		setToggleTodo(false);
	};

	return (
		<Box className="base-container">
			<Box className="header">
				<Header />
			</Box>
			{isUserLoggedIn ? (
				<Box className="content-area">
					<Box className="pomodoro-box">
						<PomodoroComponent />
					</Box>

					<Box className="todo-box">
						<Box>
							{toggleTodo ? (
								<Box>
									<ArrowLeftIcon
										onClick={() => {
											setToggleTodo(false);
										}}
										id="arrow-icon"
									/>
									<TodoComponent />
								</Box>
							) : (
								<ArrowRightIcon
									onClick={() => {
										setToggleTodo(true);
									}}
									id="arrow-icon"
								/>
							)}
						</Box>
					</Box>
				</Box>
			) : (
				<Center>
					<WelcomeImage />
				</Center>
			)}
		</Box>
	);
};
export default HomePage;
