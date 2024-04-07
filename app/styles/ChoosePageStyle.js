import { StyleSheet } from "react-native";
import {COLORS} from "../constants/theme";

export const lightStyle = StyleSheet.create({


    container: {
        flex: 1,
        flexDirection: "column",

        width: "100%"
    },
    alldropdowns: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",


    },
    dropdownButton: {
        marginBottom: 10,

    },
    iconContainer: {
        width: "100%",
        alignItems: 'center',
        paddingTop: 35,
    },
    buttonsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 20,
        paddingHorizontal: 10,
    },
    button: {
        marginVertical: 5,
        width: "30%",
        height: 45,
        justifyContent: 'center',
        marginHorizontal: 5,
        borderRadius: 10,
        flexDirection: "column"
    },
    chooseFaculty: {
        marginVertical: 5,
        width: "46%",
        height: 45,
        justifyContent: 'center',
        marginHorizontal: 5,
        borderRadius: 10,
        flexDirection: "column"
    },
});


export const darkStyle = StyleSheet.create({

    background: {
        flex: 1,
        resizeMode: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
      },
    
    container: {
        backgroundColor: '#000000',
        flex: 1,
        flexDirection: "column",

        width: "100%"
    },
    alldropdowns: {
        border: 50,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    dropdownButton: {
        marginBottom: 10,

    },
    iconContainer: {
        width: "100%",
        alignItems: 'center',
        paddingTop: 35,
    },
    buttonsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 20,
        paddingHorizontal: 10,
    },
    button: {
        marginVertical: 5,
        width: "30%",
        height: 45,
        justifyContent: 'center',
        marginHorizontal: 5,
        borderRadius: 10,
        flexDirection: "column"
    },
    chooseFaculty: {
        marginVertical: 5,
        width: "46%",
        height: 45,
        justifyContent: 'center',
        marginHorizontal: 5,
        borderRadius: 10,
        flexDirection: "column"
    },
});

