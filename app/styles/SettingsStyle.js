import { StyleSheet } from "react-native";

const darkMode = StyleSheet.create({
	bigView: {
		backgroundColor: "#012A4A",
		marginTop: 0,
		flexDirection: "column",
	},
});

const lightMode = StyleSheet.create({
	bigView: {
		backgroundColor: "#A9D6E5",
		marginTop: 0,
		flexDirection: "column",
	},
});
export { darkMode, lightMode };
