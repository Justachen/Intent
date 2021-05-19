import React, { useState } from "react";
import {
	Box,
	Button,
	Center,
	Heading,
	VStack,
	HStack,
	Text,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import "../../services/styles.css";
import SettingPomodoro from "./SettingPomodoro";
import CountDownTimer from "./CountDownTimer";
import useStore from "../../services/store";

const PomodoroComponent = () => {
	const setPomodoro = useStore((state) => state.updatePomodoro);
	const pomodoro = useStore((state) => state.pomodoro);
	const [executing, setExecuting] = useState({});
	const [startAnimate, setStartAnimate] = useState(false);

	const startTimer = () => {
		setStartAnimate(true);
	};

	const pauseTimer = () => {
		setStartAnimate(false);
	};

	const SettingBtn = () => {
		setExecuting({});
		setPomodoro(0);
		setStartAnimate(false);
	};

	const setCurrentTimer = (active_state) => {
		updateExecute({
			...executing,
			active: active_state,
		});
		setTimerTime(active_state);
		setStartAnimate(false);
	};

	const updateExecute = (updateSettings) => {
		setExecuting(updateSettings);
		setTimerTime(updateSettings.active);
	};

	const setTimerTime = (active_state) => {
		switch (active_state) {
			case "worktimer":
				setPomodoro(executing.worktimer);
				break;
			case "shortbreak":
				setPomodoro(executing.shortbreak);
				break;
			case "longbreak":
				setPomodoro(executing.longbreak);
				break;
			default:
				setPomodoro(0);
				break;
		}
		console.log(active_state);
		console.log({ pomodoro });
	};

	const children = ({ remainingTime }) => {
		let minutes = Math.floor(remainingTime / 60);
		let seconds = remainingTime % 60;
		return `${minutes}:${seconds}`;
	};

	return (
		<Box className="pomodoro-card">
			<Center>
				<VStack mb={4}>
					<Heading className="pomodoro-header">Pomodoro</Heading>
					<Text className="pomodoro-header">
						Be more productive and focused.
					</Text>
				</VStack>
			</Center>
			{pomodoro ? (
				<Box>
					<HStack>
						<Button
							id="pomodoro-standard-btn"
							title="Work"
							onClick={() => setCurrentTimer("worktimer")}
						>
							Work
						</Button>
						<Button
							id="pomodoro-standard-btn"
							title="Short Break"
							onClick={() => setCurrentTimer("shortbreak")}
						>
							Short Break
						</Button>
						<Button
							id="pomodoro-standard-btn"
							title="Long Break"
							onClick={() => setCurrentTimer("longbreak")}
						>
							Long Break
						</Button>
					</HStack>
					<Center mt={4} mb={4}>
						<VStack>
							<EditIcon
								id="edit-icon"
								boxSize={6}
								onClick={() => SettingBtn()}
							/>

							<Box>
								<CountDownTimer
									key={pomodoro}
									timer={pomodoro}
									animate={startAnimate}
									stopTimer={pauseTimer}
									children={children}
								/>
							</Box>
							<HStack>
								<Button
									id="pomodoro-standard-btn"
									onClick={() => startTimer()}
								>
									Start
								</Button>
								<Button
									id="pomodoro-standard-btn"
									onClick={() => pauseTimer()}
								>
									Pause
								</Button>
							</HStack>
						</VStack>
					</Center>
				</Box>
			) : (
				<SettingPomodoro updateExecute={updateExecute} />
			)}
		</Box>
	);
};

export default PomodoroComponent;
