import { StyleSheet } from 'react-native';
export const middleButton = StyleSheet.create({
  middleBtn: { flex: 1, justifyContent: 'center', alignItems: 'center' }});
export const lightStyle = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#A9D6E5',
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
      backgroundColor: '#468FAF',
      color: '#000000',
      paddingHorizontal: 15,
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 5,
      fontWeight: 'bold',
    },
    title: {
      width:200,
      fontSize: 20,
      color: '#000000',
    },
    buttonContainer: {
      paddingHorizontal: 20,
      marginTop: 20,
      borderRadius: 10,
      backgroundColor: '#A9D6E5',
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 50,
      height: 50,
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
      borderTopColor: '#ffffff',
      padding:10,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20
    },
  });


export const darkStyle = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#012A4A',
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
    color:'#FFFFFF',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color:'#FFFFFF',
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color:'#FFFFFF',
    fontSize: 28,
    backgroundColor: '#2A6F97',
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
    color:'#FFFFFF',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#816e94',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
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
      color:'#FFFFFF',
  },
  hour:{
    fontSize:20,
    color:'#FFFFFF',
  },
  dropdown: {
    borderTopWidth:3,
    borderTopStartRadius:5,
    borderTopEndRadius:5,
    borderTopColor: '#FFFFFF',
    padding:10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
    
  },
});


export const modalstyles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)", // This will create a semi-transparent black background
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
      color:'red',
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
