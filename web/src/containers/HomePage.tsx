import React from "react";
import { Center } from "@chakra-ui/react";
import { ReactComponent as WelcomeImage } from "../assets/welcome.svg";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => (
	<Center>
		<WelcomeImage style={{ width: "35%" }} />
	</Center>
);

export default HomePage;
