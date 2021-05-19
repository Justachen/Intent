import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Box, Button, Center, Heading, HStack } from "@chakra-ui/react";

import "../../services/styles.css";
import InputField from "../InputField";
import useStore from "../../services/store";

const initialValues = { name: "", value: 0 };

const SettingPomodoro = ({ updateExecute }) => {
	const setPomodoro = useStore((state) => state.updatePomodoro);
	const [newTimer, setNewTimer] = useState({
		worktimer: 25,
		shortbreak: 5,
		longbreak: 30,
		active: "worktimer",
	});

	const handleChange = (values) => {
		const { name, value } = values.target;
		switch (name) {
			case "worktimer":
				setNewTimer({
					...newTimer,
					worktimer: parseInt(value),
				});
				break;
			case "shortbreak":
				setNewTimer({
					...newTimer,
					shortbreak: parseInt(value),
				});
				break;
			case "longbreak":
				setNewTimer({
					...newTimer,
					longbreak: parseInt(value),
				});
				break;
			default:
				break;
		}
	};

	const handleSubmit = () => {
		updateExecute(newTimer);
		setPomodoro(newTimer.worktimer);
	};

	return (
		<Formik
			initialValues={initialValues}
			onChange={(values) => handleChange(values)}
			onSubmit={() => handleSubmit()}
		>
			{({ values }) => (
				<Form>
					<Box maxW="lg">
						<Box mt={4}>
							<HStack maxW="lg">
								<InputField
									id="pomodoro-settings-input"
									name="worktimer"
									type="text"
									onChange={handleChange}
									placeholder="25"
									_placeholder={{ color: "grey" }}
									size="lg"
								/>
								<InputField
									id="pomodoro-settings-input"
									name="shortbreak"
									type="text"
									onChange={handleChange}
									placeholder="5"
									_placeholder={{ color: "grey" }}
									size="lg"
								/>
								<InputField
									id="pomodoro-settings-input"
									name="longbreak"
									type="text"
									onChange={handleChange}
									placeholder="30"
									_placeholder={{ color: "grey" }}
									size="lg"
								/>
							</HStack>
						</Box>
						<Center>
							<Button
								mt={8}
								type="submit"
								id="pomodoro-standard-btn"
							>
								Set Timer
							</Button>
						</Center>
					</Box>
				</Form>
			)}
		</Formik>
	);
};

export default SettingPomodoro;
