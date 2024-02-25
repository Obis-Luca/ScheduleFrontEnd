import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View,StyleSheet,SectionList,Text,TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

function HomeScreen({ navigation }) {
  const [showBothWeeks, setShowBothWeeks] = React.useState(false);

  const toggleWeeks = () => {
    setShowBothWeeks(prevState => !prevState);
  };

  const dataToShow = showBothWeeks ? DataWeek2 : DataWeek1;

  const addHour = () => {
    // Implement your logic to add more hours here
    console.log('Adding more hours...');
  };

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
}



function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

const myApp = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const DataWeek1 = [
  {
    title: 'Luni',
    data: ['MAP', 'PS', 'COMPUTER NETWORKS'],
  },
  {
    title:'Marti',
    data: ['FP', 'BD'],
  },
  {
    title:'Miercuri',
    data: ['PLF', 'PS-SEMINAR', 'MAP'],
  },
  {
    title:'Joi',
    data: ['Algebra', 'OOP'],
  },
  {
    title:'Vineri',
    data: [],
  }
];

const DataWeek2 = [
  {
    title: 'Monday',
    data: ['Algebra', 'OOP'],
  },
  {
    title: 'Tuesday',
    data: ['PLF', 'PS-SEMINAR', 'MAP'],
  },
  {
    title: 'Wednesday',
    data: ['FP', 'BD'],
  },
  {
    title: 'Thursday',
    data: ['MAP', 'PS', 'COMPUTER NETWORKS'],
  },
  {
    title: 'Friday',
    data: [],
  }
];


const styles = StyleSheet.create({
  item: {
    backgroundColor: '#e8eaf6', // Light indigo color
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dayHeader: {
    fontSize: 28,
    backgroundColor: '#c5cae9', // Slightly darker indigo for contrast
    color: '#212121', // Dark text color for better readability
    padding: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    fontWeight: 'bold',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    color: '#424242', // Darker grey for text
  },
  buttonContainer: {
    paddingHorizontal: 20, // Add padding to the button container
    marginTop: 20, // Add margin to separate from the section list
    borderRadius: 10, // Rounded edges
    backgroundColor: '#dcedc8', // Blending color
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20, // Adjusted to position in the bottom right corner
    width: 40,
    height: 40,
    backgroundColor: '#3f51b5', // Background color of the button
    borderRadius: 20, // Make it round
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Add elevation for a shadow effect (Android)
    zIndex: 999, // Make sure it appears on top of other content
  },
});


export default myApp;
