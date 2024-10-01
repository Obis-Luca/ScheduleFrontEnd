import { StyleSheet } from "react-native";

export const lightStyle = StyleSheet.create({
	addButton: {
		position: "absolute",
		bottom: 20,
		right: 20,
		width: 50,
		height: 50,
		backgroundColor: "#3f51b5",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		elevation: 3,
		zIndex: 999,
	},
	modalPopUp: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		//height: 400,
	},
	modalNotificationPopUp: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		height: 260,
	},
});

export const darkStyle = StyleSheet.create({
	addButton: {
		position: "absolute",
		bottom: 20,
		right: 20,
		width: 50,
		height: 50,
		backgroundColor: "#3f51b5",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		elevation: 3,
		zIndex: 999,
	},
	modalPopUp: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		//height: 400,
	},
	modalNotificationPopUp: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		height: 200,
	},
});
