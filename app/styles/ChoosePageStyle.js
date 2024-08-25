import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const lightStyle = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		width: "100%",
		backgroundColor: colors.lightBackground,
	},
	alldropdowns: {
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center",
	},
});

export const darkStyle = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		width: "100%",
		backgroundColor: colors.darkBackground,
	},
	alldropdowns: {
		backgroundColor: "#2E2E2E",
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center",
	},
});

export const dropdownStyles = {
	light: StyleSheet.create({
		box: {
			marginTop: 20,
			marginBottom: 10,
			padding: 10,
			borderRadius: 25,
			backgroundColor: colors.lightBackground,
			shadowColor: colors.darkText,
			shadowOffset: { width: 3, height: 2 },
			shadowOpacity: 0.3,
			shadowRadius: 2,
			elevation: 5,
		},
		dropdown: {
			backgroundColor: colors.lightBackground,
		},
		text: {
			color: colors.lightText,
		},
	}),
	dark: StyleSheet.create({
		box: {
			marginTop: 20,
			marginBottom: 10,
			padding: 10,
			borderRadius: 25,
			backgroundColor: colors.darkBackground,
			shadowColor: colors.darkText,
			shadowOffset: { width: 3, height: 2 },
			shadowOpacity: 0.3,
			shadowRadius: 2,
			elevation: 5,
		},
		dropdown: {
			backgroundColor: colors.darkBackground,
		},
		text: {
			color: colors.darkText,
		},
	}),
};
