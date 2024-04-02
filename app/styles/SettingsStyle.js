import { StyleSheet } from "react-native";
// import {white} from "react-native-paper/lib/typescript/styles/themes/v2/colors";
const darkMode = StyleSheet.create({
        bigView: {
            backgroundColor: 'green',
            marginTop: 0 ,
            flexDirection: 'column'

        },

})

const lightMode = StyleSheet.create({
    bigView: {
        backgroundColor: 'white',
        marginTop: 0 ,
        flexDirection: 'column'
    },
})
export { darkMode, lightMode };