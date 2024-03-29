import 'react-native-gesture-handler';
import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './app/screens/HomeScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import ChoosePage from './app/screens/ChoosePage';


export default function MyApp()  {
    const Drawer = createDrawerNavigator();
    const [DataWeek1, setDataWeek1] = useState([]);
    const [DataWeek2, setDataWeek2] = useState([]);

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home">
                    {props => <HomeScreen {...props} DataWeek1={DataWeek1} DataWeek2={DataWeek2} />}
                </Drawer.Screen>
                <Drawer.Screen name="ChoosePage">
                    {props => <ChoosePage {...props} setDataWeek1={setDataWeek1} setDataWeek2={setDataWeek2} />}
                </Drawer.Screen>
                <Drawer.Screen name="Settings" component={SettingsScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
