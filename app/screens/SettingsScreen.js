import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import { animatedView, darkMode, lightMode } from "../styles/SettingsStyle";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from 'react-i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectList } from "react-native-dropdown-select-list";
import { dropdownStyles } from "../styles/ChoosePageStyle"; 

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const languages = [
    { label: 'English', value: 'English' },
    { label: 'Romana', value: 'Romana' },
    { label: 'Français', value: 'Français' },
    { label: 'Espagnol', value: 'Espagnol' },
  ];

  const handleLanguageChange = async (language) => {
    const languageCode = language.toLowerCase().substring(0, 2);

    try {
      await AsyncStorage.setItem('appLanguage', languageCode);
      i18n.changeLanguage(languageCode);
    } catch (error) {
      console.error("Failed to save the language to AsyncStorage", error);
    }
  };

  const LanguageDropdown = () => {
    const itemHeight = 40;
    const dropdownHeight = languages.length * itemHeight;

    return (
      <View style={{ position: 'relative', width: 150 }}>
      <SelectList
        boxStyles={{ 
          ...dropdownStyles[theme].box, 
          width: 150,           
          minWidth: 150,       
        }}
        dropdownStyles={{ 
          ...dropdownStyles[theme].dropdown, 
          height: dropdownHeight,
          position: 'absolute',
          top: 60,  
          zIndex: 1000,         
          width: 150,          
        }}
        inputStyles={dropdownStyles[theme].text}
        dropdownTextStyles={dropdownStyles[theme].text}
        data={languages}
        placeholder="               -"
        save="value"
        selected={selectedLanguage}
        setSelected={(val) => {
          setSelectedLanguage(val);  
          handleLanguageChange(val);
        }}
      />
      </View>
    );
  };
  

  return (
    <View style={theme === "dark" ? darkMode.bigView : lightMode.bigView}>
  
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 30 }}>
        <Text style={theme === "dark" ? darkMode.text : lightMode.text}>
          {t('settings_page.choose_theme')}
        </Text>
        <Animated.View entering={FadeInDown.duration(500).springify()}>
          <View style={animatedView.animatedView}>
            <Switch
              trackColor={{ false: "#000000", true: "#fdfdfd" }}
              thumbColor={theme === "dark" ? "#000000" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleTheme}
              value={theme === "dark"}
            />
          </View>
        </Animated.View>
      </View>
  
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 0, marginRight: 10 }}>
        <Text style={theme === "dark" ? darkMode.text : lightMode.text}>
          {t('settings_page.choose_language')}
        </Text>
        <LanguageDropdown />
      </View>
    </View>
  );
  
};

export default SettingsScreen;
