import { StyleSheet } from 'react-native';
export const middleButton = StyleSheet.create({
  middleBtn: { flex: 1, justifyContent: 'center', alignItems: 'center' }});
export const lightStyle = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#e8eaf6',
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
    dayHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 28,
      backgroundColor: '#c5cae9',
      color: '#212121',
      paddingHorizontal: 15,
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 5,
      fontWeight: 'bold',
    },
    title: {
      width:200,
      fontSize: 20,
      color: '#424242',
    },
    buttonContainer: {
      paddingHorizontal: 20,
      marginTop: 20,
      borderRadius: 10,
      backgroundColor: '#dcedc8',
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 40,
      height: 40,
      backgroundColor: '#3f51b5',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3,
      zIndex: 999,
    },
    div_for_hour_and_dropdownArrow: {
      marginLeft:10,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    hour:{
      fontSize:20,
    },
    dropdown: {
      borderTopWidth:3,
      borderTopStartRadius:5,
      borderTopEndRadius:5,
      borderTopColor: 'lightgrey',
      padding:10,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20
    },
  });


export const darkStyle = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#9c9da8',
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
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    fontSize: 28,
    backgroundColor: '#8b8fa8',
    color: '#0c0c0c',
    padding: 5,
    paddingHorizontal: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  title: {
    width:200,
    fontSize: 20,
    color: '#2f2f2f',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#a3b095',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: '#293377',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    zIndex: 999,
  },
  div_for_hour_and_dropdownArrow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  hour:{
    fontSize:20,
  },
  dropdown: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});


export const modalstyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
      width: 24,
      height: 24,
      marginLeft: 5,
      marginTop:3,
    },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
