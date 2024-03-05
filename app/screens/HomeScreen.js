import React, { useState, useRef } from 'react';
import { View, Button, SectionList, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { DataWeek1, DataWeek2 } from '../data/Data'; // Import data from separate file
import { styles } from '../styles/Styles'; // Import styles from separate file
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  const [showBothWeeks, setShowBothWeeks] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleWeeks = () => {
    setShowBothWeeks(prevState => !prevState);
    setExpandedItem(null); // Close dropdown when switching weeks
  };

  const toggleItem = (item) => {
    setExpandedItem(prevItem => (prevItem === item ? null : item));
    
  };

  const addHour = () => {
    console.log('Adding more hours...');
    setExpandedItem(null);
  };

  const dataToShow = showBothWeeks ? DataWeek2 : DataWeek1;
  const sectionListRef = useRef(null);

  const handleOutsidePress = () => {
    setExpandedItem(null);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={{ flex: 1 }}>


        {/* Button pentru weeks */}
        <View style={styles.buttonContainer}>
          <Button
            title={showBothWeeks ? "Week 1" : "Week 2"}
            onPress={toggleWeeks}
            color="#a5d6a7" 
          />
        </View>


        <View style={{ flex: 1 }}>


          {/* Lista cu ore */}
          <SectionList
            ref={sectionListRef}
            style={{ width: '100%' }}
            sections={dataToShow}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (


              // Button pentru dropdown
              <TouchableOpacity onPress={() => toggleItem(item)}>
                <View style={styles.item}>
                  <Text style={styles.title}>{item}</Text>
                  {expandedItem === item && (
                    <View style={styles.dropdownContent}>
                      {/* Render your extra information here */}
                      <Text>Extra information for {item}</Text>
                    </View>
                  )}
                  <Icon name={expandedItem === item ? "angle-up" : "angle-down"} size={20} color="#000" style={{ marginLeft: 10 }} />
                </View>
              </TouchableOpacity>


            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.dayHeader}>{title}</Text>
            )}
          />



        </View>


        {/* Button pentru add hours */}
        <TouchableOpacity style={styles.addButton} onPress={addHour}>
          <Icon name="plus" size={24} color="#fff" />
        </TouchableOpacity>



      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
