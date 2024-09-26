import React, { useState } from "react";
import { View, Text, Switch, ScrollView, TouchableOpacity } from "react-native";
import {  darkMode, lightMode } from "../styles/SettingsStyle";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from 'react-i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectList } from "react-native-dropdown-select-list";
import { dropdownStyles } from "../styles/ChoosePageStyle"; 

import { Modal, Portal, Provider } from 'react-native-paper';
import ColorPicker, { HueSlider, Panel1 } from 'reanimated-color-picker';
import { useColors } from '../context/ColorsContext';
import { styles } from "../styles/SettingsStyle";

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activePicker, setActivePicker] = useState('');
  const { course, seminar, lab, setColors } = useColors();
  const [colors, setNewColors] = useState({
    course: course || '#FF5733',
    seminar: seminar || '#33FF57',
    lab: lab || '#3357FF',
  });

  const languages = [
    { label: 'English', value: 'English' },
    { label: 'Romana', value: 'Romana' },
    { label: 'Français', value: 'Français' },
    { label: 'Espagnol', value: 'Espagnol' },
  ];


  
  
  
  
    const toggleModal = (pickerType) => {
    setActivePicker(pickerType);
    setIsModalVisible(!isModalVisible);
  };

  const handleColorChange = (color) => {
    setNewColors((prevColors) => ({
      ...prevColors,
      [activePicker]: color.hex,
    }));
    
    setColors(activePicker, color.hex);
  };
  
  const themeStyles = theme === 'dark' ? darkMode : lightMode;

  const ColorButton = ({ label, colorKey }) => (
    <TouchableOpacity
      style={[styles.colorButton, themeStyles.colorButton]}
      onPress={() => toggleModal(colorKey)}
    >
      <Text style={[styles.colorButtonText, themeStyles.text]}>{label}</Text>
      <View style={[styles.colorPreview, { backgroundColor: colors[colorKey] }]} />
    </TouchableOpacity>
  );






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
    <Provider>
      <ScrollView style={[styles.container, themeStyles.bigView]}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, themeStyles.text]}>
             {t('settings_page.choose_theme')}
            </Text>
          <View style={styles.themeToggle}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={theme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
              onValueChange={toggleTheme}
              value={theme === 'dark'}
            />
          </View>
        </View>

      

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, themeStyles.text]}>Color Settings</Text>
          <ColorButton label="Course Color" colorKey="course" />
          <ColorButton label="Seminar Color" colorKey="seminar" />
          <ColorButton label="Lab Color" colorKey="lab" />
        </View>

        <Portal>
          <Modal
            visible={isModalVisible}
            onDismiss={() => setIsModalVisible(false)}
            contentContainerStyle={[styles.modalContainer, themeStyles.modalContainer]}
          >
            <Text style={[styles.modalTitle, themeStyles.text]}>Pick a {activePicker} color</Text>
            <ColorPicker
              value={colors[activePicker]}
              onComplete={handleColorChange}
              style={{ width: '100%', height: 300 }}
            >
              <Panel1 />
              <HueSlider />
            </ColorPicker>
            <TouchableOpacity
              style={[styles.closeButton, themeStyles.closeButton]}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={[styles.closeButtonText, themeStyles.closeButtonText]}>Close</Text>
            </TouchableOpacity>
          </Modal>
        </Portal>


        
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 0, marginRight: 10 }}>
          <Text style={theme === "dark" ? darkMode.text : lightMode.text}>
            {t('settings_page.choose_language')}
          </Text>
          <LanguageDropdown />
        </View>

        
      </ScrollView>
    </Provider>
  );
};

export default SettingsScreen;