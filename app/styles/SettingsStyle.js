import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";

const darkMode = StyleSheet.create({
	bigView: {
		backgroundColor: colors.darkBackground,
		marginTop: 0,
		flex: 1,
		flexDirection: "column",
	},
	text: {
		padding: 20,
		fontSize: 20,
		marginLeft: 8,
		color: colors.darkText,
	},
});

const lightMode = StyleSheet.create({
	bigView: {
		backgroundColor: colors.lightBackground,
		marginTop: 0,
		flex: 1,
		flexDirection: "column",
	},
	text: {
		padding: 20,
		fontSize: 20,
		marginLeft: 8,
		color: colors.lightText,
	},
});

const animatedView = StyleSheet.create({
	animatedView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginLeft: 170,
		transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
	},
});

const modalStyles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		backgroundColor: 'white', // Add background color to make content visible
		padding: 20,
	},
	chooseColorDiv: {
		marginBottom: 20,
	},
	text: {
		fontSize: 16,
		marginBottom: 10,
	},
	closeButton: {
		backgroundColor: '#007bff', // Add background color for better visibility
	},
})

export { darkMode, lightMode, animatedView, modalStyles };
