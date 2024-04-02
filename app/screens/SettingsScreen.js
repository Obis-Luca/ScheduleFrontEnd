import React, { useEffect } from 'react';
import { View, Switch, Text } from 'react-native';
import { darkMode, lightMode } from '../styles/SettingsStyle';
import Animated, {FadeInDown} from "react-native-reanimated";
import { useTheme } from '../config/ThemeContext';

const SettingsScreen = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <View style={theme === 'dark' ? darkMode.bigView : lightMode.bigView}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{padding: 20, fontSize: 20, marginLeft: 8}}>Alege tema</Text>
                <Animated.View entering = {FadeInDown.duration(500).springify()}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 170 ,transform: [{ scaleX: 1.5 }, { scaleY:1.5 }] }}>
                        <Switch
                            trackColor={{ false: "#000000", true: "#fdfdfd" }}
                            thumbColor={theme === 'dark' ? "#000000" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleTheme}
                            value={theme === 'dark'}
                        />
                    </View>
                </Animated.View>
            </View>
        </View>
    );
};

export default SettingsScreen;