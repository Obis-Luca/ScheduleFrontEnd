import React from "react";
import { View, Switch, Text } from "react-native";
import { animatedView, darkMode, lightMode } from "../styles/SettingsStyle";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";

const SettingsScreen = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<View style={theme === "dark" ? darkMode.bigView : lightMode.bigView}>
			<View style={theme === "dark" ? darkMode.bigView : lightMode.bigView}>
				<View style={{ flexDirection: "row" }}>
					<Text style={theme === "dark" ? darkMode.text : lightMode.text}>Alege tema</Text>
					<Animated.View entering={FadeInDown.duration(500).springify()}>
						<View style={animatedView.animatedView}>
							<Switch
								trackColor={{ false: "#000000", true: "#fdfdfd" }}
								thumbColor={theme === "dark" ? "#000000" : "#f4f3f4"}
								ios_backgroundColor="#3e3e3e"
								onValueChange={toggleTheme}
								value={theme === "dark"}
							/>
						</View>
					</Animated.View>
				</View>
			</View>
		</View>
	);
};

export default SettingsScreen;
