import React, { useState } from 'react';
import { View, Button, SectionList, Text, TouchableOpacity } from 'react-native';
import { DataWeek1, DataWeek2 } from '../data/Data'; // Import data from separate file
import { styles } from '../styles/Styles'; // Import styles from separate file
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  const [showBothWeeks, setShowBothWeeks] = useState(false);

  const toggleWeeks = () => {
    setShowBothWeeks(prevState => !prevState);
  };


  const addHour = () => {
    console.log('Adding more hours...');
  };

  const dataToShow = showBothWeeks ? DataWeek2 : DataWeek1;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.buttonContainer}>
        <Button
          title={showBothWeeks ? "Week 1" : "Week 2"}
          onPress={toggleWeeks}
          color="#a5d6a7" // Adjust color to blend with the rest
        />
      </View>
      <View style={{ flex: 1 }}>
        <SectionList
          style={{ width: '100%' }}
          sections={dataToShow}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.dayHeader}>{title}</Text>
          )}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={addHour}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
