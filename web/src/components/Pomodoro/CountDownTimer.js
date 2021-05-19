import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Box } from "@chakra-ui/react";

const CountDownTimer = ({ key, timer, animate, children, stopTimer }) => {
	console.log({ timer });
	return (
		<Box mt={4} mb={8}>
			<CountdownCircleTimer
				key={key}
				isPlaying={animate}
				duration={timer * 60}
				colors={[
					["#008080", 0.33],
					["#008080", 0.33],
					["#008080", 0.33],
				]}
				trailColor="#fe6f6b"
				size={220}
				strokeWidth={8}
				trailStrokeWidth={8}
				onComplete={() => stopTimer()}
			>
				{children}
			</CountdownCircleTimer>
		</Box>
	);
};

export default CountDownTimer;
