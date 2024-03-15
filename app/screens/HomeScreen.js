import React, { useState, useRef } from 'react';
import { View, Button, SectionList, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { DataWeek1, DataWeek2 } from '../data/Data'; // Import data from separate file
import { styles } from '../styles/Styles'; // Import styles from separate file
import Icon from 'react-native-vector-icons/FontAwesome';
import {populateWeeks} from "../data/Data";

const HomeScreen = () => {
    const DataWeek1 = [];
    const DataWeek2 = [];
  const [weekShown, setweekShown] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleWeeks = () => {
    setweekShown(prevState => !prevState);
    setExpandedItem(null); 
  };

  const toggleItem = (item) => {
    setExpandedItem(prevItem => (prevItem === item ? null : item));
  };

  const addHour = () => {
    console.log('Adding more hours...');
    setExpandedItem(null);
  };

  const dataToShow = weekShown ? DataWeek2 : DataWeek1;
  const sectionListRef = useRef(null);

  const handleOutsidePress = () => {
    setExpandedItem(null);
  };

  return (
      <View style={{ flex: 1 }}>



        {/* Button pentru weeks */}
        <View style={styles.buttonContainer}><Button title={weekShown ? "Week 1" : "Week 2"} onPress={toggleWeeks} /></View>


        {/* Lista cu ore */}
        <View style={{ flex: 1 }}>
          <SectionList
            ref={sectionListRef}
            style={{ width: '100%' }}
            sections={dataToShow}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => toggleItem(item)}>
                <View style={styles.itemContainer}>

                  {/* Header Row */}
                  <View style={styles.itemHeader}>
                    <Text style={styles.title}>{item.course_name}</Text>

                    <View style={styles.div_for_hour_and_dropdownArrow}>
                        <Text style={styles.title}>{item.course_hour}</Text>
                        <Icon name={expandedItem === item ? "angle-up" : "angle-down"} size={20} color="#000" style={{ marginLeft: 10 }} />
                    </View>
                  </View>
            

                  {/* Expanded Info */}
                  {expandedItem === item && (
                    <View style={styles.dropdown}>
                      <Text>{item.course_type}</Text>
                      <Text>{item.room_details}</Text>
                      <Text>{item.room}</Text>
                      <Text>{item.professor}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )}

            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.dayHeader}>{title}</Text>
              
            )}
          />
        </View>



        {/* Button pentru add hours */}
        <TouchableOpacity style={styles.addButton} onPress={addHour}><Icon name="plus" size={24} color="#fff" /></TouchableOpacity>


      </View>
  );
};

export default HomeScreen;
