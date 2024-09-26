import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";
import { lightStyle, darkStyle } from "../../styles/HomePageStyles";
import { useTranslation } from 'react-i18next';

const EmptyState = ({ theme, navigation }) => {
	
	const { t, i18n } = useTranslation();

	return(
	<>
		<Animated.View entering={FadeInDown.duration(800).springify()}>
			<Image
				style={{
					width: 170,
					height: 170,
					alignSelf: "center",
					marginTop: 220,
					justifyContent: "center",
				}}
				source={
					theme === "dark"
						? require("../../images/calendar-svgrepo-com2.png")
						: require("../../images/calendar-svgrepo-com.png")
				}
			/>
			<Text
				style={{
					color: theme === "dark" ? "#FFFFFF" : "#000000",
					textAlign: "center",
					alignItems: "center",
					marginTop: 20,
					fontSize: 20,
					fontWeight: "bold",
				}}>
				{t("home_page.empty_state")}
			</Text>
		</Animated.View>
		<TouchableOpacity
			style={theme === "dark" ? darkStyle.addButton : lightStyle.addButton}
			onPress={() => navigation.navigate(t("choose_page.top_title"))}>
			<Icon name="plus" size={24} color="#fff" />
		</TouchableOpacity>
	</>
	)
};

export default EmptyState;
