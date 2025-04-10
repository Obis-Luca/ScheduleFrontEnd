import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const lightStyle = StyleSheet.create({
	itemContainer: {
		backgroundColor: colors.lightBackground,
		padding: 15,
		marginVertical: 6,
		marginHorizontal: 10,
		borderRadius: 40,
		shadowColor: colors.lightText,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 3.84,
		elevation: 5,
	},
	itemHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	dayHeader: {
	justifyContent: "center",    
	alignItems: "center",        
	textAlign: "center",        
	fontSize: 18,
	backgroundColor: colors.primary,
	color: colors.white,
	paddingHorizontal: 15,
	paddingVertical: 10,
	marginVertical: 5,
	marginHorizontal: 10,
	borderRadius: 5,
	fontWeight: "bold",
},

	title: {
		width: 200,
		fontSize: 20,
		color: colors.lightText,
	},
	addButton: {
		position: "absolute",
		bottom: 20,
		right: 20,
		width: 50,
		height: 50,
		backgroundColor: colors.buttonColor,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		elevation: 3,
		zIndex: 999,
	},
	div_for_hour_and_dropdownArrow: {
		marginLeft: 10,
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	hour: {
		fontSize: 20,
		color: colors.lightText,
	},
	dropdown: {
		borderTopWidth: 3,
		borderTopStartRadius: 5,
		borderTopEndRadius: 5,
		borderTopColor: colors.darkText,
		padding: 10,
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
	},
	buttonContainer: {
		paddingHorizontal: 20,
		marginTop: 20,
		borderRadius: 10,
		backgroundColor: colors.lightAccent,
	},
	weekButton: {
		backgroundColor: colors.lightWeekButton,
		padding: 5,
		margin: 5,
		marginTop: 10,
		alignItems: "center",
		width: '50%', 
		alignSelf: "center",
		borderRadius: 10,  
	},	
	weekButtonText: {
		color: colors.lightText,
		fontSize: 18,
		fontWeight: "bold",
	}
});

export const darkStyle = StyleSheet.create({
	itemContainer: {
		color: colors.darkText,
		padding: 15,
		marginVertical: 6,
		marginHorizontal: 10,
		borderRadius: 40,
		shadowColor: colors.lightText,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 3.84,
		elevation: 5,
	},
	itemHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		color: colors.darkText,
	},
	dayHeader: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		color: "colors.darkText",
		fontSize: 18,
		backgroundColor: "#3f51b5",
		padding: 5,
		paddingHorizontal: 15,
		paddingVertical: 10,
		marginVertical: 5,
		marginHorizontal: 10,
		borderRadius: 5,
		fontWeight: "bold",
	},
	title: {
		width: 200,
		fontSize: 20,
		color: colors.darkText,
	},
	addButton: {
		position: "absolute",
		bottom: 20,
		right: 20,
		width: 50,
		height: 50,
		backgroundColor: colors.buttonColor,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		elevation: 3,
		zIndex: 999,
	},
	div_for_hour_and_dropdownArrow: {
		marginLeft: 10,
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	hour: {
		fontSize: 20,
		color: colors.darkText,
	},
	dropdown: {
		borderTopWidth: 3,
		borderTopStartRadius: 5,
		borderTopEndRadius: 5,
		borderTopColor: colors.lightText,
		padding: 10,
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
	},
	buttonContainer: {
		paddingHorizontal: 20,
		marginTop: 20,
		borderRadius: 10,
		backgroundColor: colors.darkBackground,
	},
	weekButton: {
		backgroundColor: colors.darkBackground,
		padding: 5,
		margin: 5,
		marginTop: 10,
		alignItems: "center",
		width: '50%', 
		alignSelf: "center",
		borderRadius: 10,  
	},	
	weekButtonText: {
		color: colors.darkText,
		fontSize: 18,
		fontWeight: "bold",
	}
});

export const modalstyles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		opacity: 1,
		shadowColor: colors.lightText,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	icon: {
		width: 24,
		height: 24,
		marginLeft: 5,
		marginTop: 3,
		color: colors.error,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	textStyle: {
		color: colors.darkText,
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});

export const floatingButtonStyles = StyleSheet.create({
	floatingButton: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		width: 60,
		height: 60,
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
	},
	lightButton: {
		backgroundColor: '#1ABC9C',
	},
	darkButton: {
		backgroundColor: '#3f51b5',
	},
	buttonText: {
		fontSize: 20,
		color: '#fff',
	},

	ConfigureModalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 50,
	  },
	  ConfigureModalContainerDark: {
		width: '80%',               
		maxHeight: '80%',            
		backgroundColor: colors.darkBackground,
		borderRadius: 20,
		padding: 20,
		paddingRight: 1,
		alignItems: 'center',
		justifyContent: 'flex-start', 
		elevation: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 5,
		flex: 1
	  },
	  ConfigureModalContainerLight: {
		width: '80%',               
		maxHeight: '80%',            
		backgroundColor: colors.lightBackground,
		borderRadius: 20,
		padding: 20,
		paddingRight: 1,
		alignItems: 'center',
		justifyContent: 'flex-start', 
		elevation: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 5,
		flex: 1
	  },
	  modalContent: {
		marginBottom: 0, 
	  },
	  modalText: {
		fontSize: 18,
		flexGrow: 1,
		flexShrink: 1,
		marginBottom: 1,
		marginRight: 10,
		color: "white",
		numberOfLines: 1,     
		ellipsizeMode: 'tail' 
	  },
	  courseRowDark: {
		flexDirection: 'row',
		alignItems: 'center',    
		justifyContent: 'space-between',  
		width: '95%',           
		marginBottom: 10,
		paddingVertical: 15,
		paddingHorizontal: 13,
		backgroundColor: "rgb(129, 133, 137)",
		borderRadius: 25,
	  },
	  courseRowLight: {
		flexDirection: 'row',
		alignItems: 'center',    
		justifyContent: 'space-between',  
		width: '95%',           
		marginBottom: 10,
		paddingVertical: 15,
		paddingHorizontal: 13,
		backgroundColor: "#1ABC9C",
		borderRadius: 25,
	  },
	  checkboxStyle: {
		alignSelf: 'center',   
		width: 24,           
		height: 24,
  	},
});
