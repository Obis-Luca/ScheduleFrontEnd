import { StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    borderWidth: 1,         
    borderColor: '#ccc',    
    borderRadius: 8,        
    padding: 10             
  },
  colorButtonContainer: {
    borderWidth: 1,         
    borderColor: '#ccc',  
    borderRadius: 8,        
    padding: 10,          
    marginBottom: 12       
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  themeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themeText: {
    fontSize: 18,
  },
  colorButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  colorButtonText: {
    fontSize: 16,
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  modalContainer: {
    padding: 20,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

const darkMode = StyleSheet.create({
  bigView: {
    backgroundColor: colors.darkBackground,
    marginTop: 0,
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    color: colors.darkText,
  },
  colorButton: {
    backgroundColor: colors.darkBackground,
  },
  modalContainer: {
    backgroundColor: colors.darkBackground,
  },
  closeButton: {
    backgroundColor: colors.darkText,
  },
  closeButtonText: {
    color: colors.darkBackground,
  },
});

const lightMode = StyleSheet.create({
  bigView: {
    backgroundColor: colors.lightBackground,
    marginTop: 0,
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    color: colors.lightText,
  },
  colorButton: {
    backgroundColor: colors.lightBackground,
  },
  modalContainer: {
    backgroundColor: colors.lightBackground,
  },
  closeButton: {
    backgroundColor: colors.lightText,
  },
  closeButtonText: {
    color: colors.lightBackground,
  },
});

const animatedView = StyleSheet.create({
  animatedView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 170,
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
});

export { styles, darkMode, lightMode, animatedView };
