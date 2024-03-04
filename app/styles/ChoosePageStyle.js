import { StyleSheet } from "react-native";
import {COLORS} from "../constants/theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8e2e2',
        flex: 1,
        width: "100%"
    },
    iconContainer: {
        width: "100%",
        alignItems: 'center',
        paddingTop: 35,
    },
    buttonContainer: {
        flexDirection: 'row',
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
});

export default styles;
