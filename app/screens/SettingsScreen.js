// SettingsScreen.js

import React from 'react';
import { View, Switch, Text } from 'react-native';
import { useTheme } from '../config/ThemeContext';
import { useLanguage } from '../config/LanguageContext';
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTranslation } from 'react-i18next';
import {darkMode, lightMode} from "../styles/SettingsStyle";

const SettingsScreen = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme();
    const { changeLanguage } = useLanguage();
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLanguage = i18n.language === 'en' ? 'ro' : 'en';
        changeLanguage(newLanguage);
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF' }}>
            <View style={theme === 'dark' ? darkMode.bigView : lightMode.bigView}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ padding: 20, fontSize: 20, marginLeft: 8, color: theme === 'dark' ? '#FFFFFF' : '#000000' }}>{t('Choose Theme')}</Text>
                    <Animated.View entering={FadeInDown.duration(500).springify()}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: i18n.language === 'en' ? 140 : 180    , transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}>
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
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ padding: 20, fontSize: 20, marginLeft: 8, color: theme === 'dark' ? '#FFFFFF' : '#000000' }}>{t('Change Language')}</Text>
                    <Animated.View entering={FadeInDown.duration(500).springify()}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: i18n.language === 'en' ? 113 : 150, transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}>
                            <Switch
                                trackColor={{ false: "#000000", true: "#fdfdfd" }}
                                thumbColor={i18n.language === 'en' ? "#000000" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleLanguage}
                                value={i18n.language === 'en'}
                            />
                        </View>
                    </Animated.View>
                </View>
            </View>
        </View>
    );
};

export default SettingsScreen;
