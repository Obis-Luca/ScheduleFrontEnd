import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    item: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
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
    div_for_hour_and_dropdownArrow: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    }
  });