import { StatusBar } from 'expo-status-bar';
import styles from '../styles/ChoosePageStyle'; // Import styles from separate file
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Image,
    Button,
    Pressable,
    TouchableNativeFeedback,
    Platform,
    TouchableHighlight,
    Alert,
    SafeAreaView,
    TouchableOpacity,
    StyleSheetProperties
} from 'react-native';
// import { Picker } from "react-native-web";
import { Icon1, Icon2 } from '../config/Icons';

const ChoosePage = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [showOptions, setShowOptions] = useState(false);
    const [optionSelected, setOptionSelected] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => console.log("BUGUGU")}>
                    <Icon1 />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title="Semestru" onPress={() => setShowOptions(!showOptions)} />
                </View>
                {showOptions && (
                    <>
                        <View style={styles.button}>
                            <Button title="1" onPress={() => { console.log("Option 1 pressed"); setOptionSelected(true); }} />
                        </View>
                        <View style={styles.button}>
                            <Button title="2" onPress={() => { console.log("Option 2 pressed"); setOptionSelected(true); }} />
                        </View>
                    </>
                )}
                {optionSelected && (
                    <View style={styles.button}>
                        <Button title="New Button" onPress={() => console.log("New Button pressed")} />
                    </View>
                )}
            </View>
        </View>
    );
};
export default ChoosePage;
