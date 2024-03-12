import React, { useState, useEffect } from 'react';
import { View, Switch, Text } from 'react-native';
import { darkMode, lightMode } from '../styles/SettingsStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
    const [theme, setTheme] = useState(false);

    const toggleSwitch = async () => {
        const newTheme = !theme;
        setTheme(newTheme);
        await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('theme');
            setTheme(savedTheme === 'dark');
        };
        loadTheme();
    }, []);

    return (
        <View style={theme ? darkMode.bigView : lightMode.bigView}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{padding: 20, fontSize: 25}}>Select Theme</Text>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', transform: [{ scaleX: 2 }, { scaleY:2 }] }}>
                    <Switch
                        trackColor={{ false: "#000000", true: "#fdfdfd" }}
                        thumbColor={theme ? "#000000" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={theme}
                    />
                </View>
            </View>
        </View>
    );
};

export default SettingsScreen;