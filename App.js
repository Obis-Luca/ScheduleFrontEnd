import { SafeAreaView, StyleSheet, Text, View, Image, Button, Alert, Pressable, TouchableOpacity, ScrollView,SectionList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        
        
        <TouchableOpacity>

        <Image source={require('./assets/favicon.png')} />
        </TouchableOpacity>


      </SafeAreaView>

      <ScrollView style={{
        margin: 15,
        flex: 0.9
      }}>

        <SectionList
        style={{}}
      sections={DATA}
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

      </ScrollView>

    </SafeAreaView>


  );
}



const DATA = [
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
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'beige',
  },
  header: {
    backgroundColor: "grey",
    width: "100%",
    height: "10%",
    paddingLeft: 10,
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  dayHeader: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default App;