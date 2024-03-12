import { StyleSheet } from "react-native";
import {COLORS} from "../constants/theme";

const styles = StyleSheet.create({


    container: {
        backgroundColor: '#e8e2e2',
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
        alignItems: 'center', // Add this line
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
        // backgroundColor: "#c42c2c",
        marginVertical: 5,
        width: "46%",
        height: 45,
        justifyContent: 'center',
        marginHorizontal: 5,
        borderRadius: 10,
        flexDirection: "column"
    },
});

export default styles;
