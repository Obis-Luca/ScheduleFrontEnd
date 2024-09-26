import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Modal, Portal, Provider } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import { styles, darkMode, lightMode } from '../styles/SettingsStyle';
import ColorPicker, { HueSlider, Panel1 } from 'reanimated-color-picker';
import { useColors } from '../context/ColorsContext';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activePicker, setActivePicker] = useState('');
  const { course, seminar, lab, setColors } = useColors();
  const [colors, setNewColors] = useState({
    course: course || '#FF5733',
    seminar: seminar || '#33FF57',
    lab: lab || '#3357FF',
  });

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

  return (
    <Provider>
      <ScrollView style={[styles.container, themeStyles.bigView]}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, themeStyles.text]}>Theme</Text>
          <View style={styles.themeToggle}>
            <Text style={[styles.themeText, themeStyles.text]}>Dark Mode</Text>
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
      </ScrollView>
    </Provider>
  );
};

export default SettingsScreen;