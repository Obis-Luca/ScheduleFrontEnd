import React, { useState } from "react";
import { View, Switch, Text } from "react-native";
import { animatedView, darkMode, lightMode, modalStyles } from "../styles/SettingsStyle";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";
import { Button, Modal } from "react-native-paper";
import { ScrollView } from 'react-native-gesture-handler';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import { TouchableOpacity } from "react-native";


const SettingsScreen = () => {
	const { theme, toggleTheme } = useTheme();
	const [isModalVisible, setIsModalVisible] = useState(false);

	// const [courseColor, setCourseColor] = useState("#000000");
    // const [seminarColor, setSeminarColor] = useState("#000000");
    // const [labColor, setLabColor] = useState("#000000");

	const toggleModal = () => {
		setIsModalVisible(!isModalVisible);
	}

	return (
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
{/* 
			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity>
					<Text style={theme === "dark" ? darkMode.text : lightMode.text} onPress={toggleModal}>Choose colors</Text>
				</TouchableOpacity>
				<Modal visible={isModalVisible}>
					<View style={modalStyles.modalContainer}>
					
					</View>
				</Modal>
			</View> */}
		
		</View>
	);
};

export default SettingsScreen;
