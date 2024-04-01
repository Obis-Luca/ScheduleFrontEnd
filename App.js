import 'react-native-gesture-handler';
import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './app/screens/HomeScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import ChoosePage from './app/screens/ChoosePage';
import ExamsScreen from './app/screens/ExamsScreen';
import { ThemeProvider } from './app/config/ThemeContext';


export default function MyApp()  {
    const Drawer = createDrawerNavigator();
    const [DataWeek1, setDataWeek1] = useState([]);
    const [DataWeek2, setDataWeek2] = useState([]);

    return (
        <ThemeProvider>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Acasa">
                    <Drawer.Screen name="Acasa">
                        {props => <HomeScreen {...props} DataWeek1={DataWeek1} DataWeek2={DataWeek2} />}
                    </Drawer.Screen>
                    <Drawer.Screen name="Alege orar">
                        {props => <ChoosePage {...props} setDataWeek1={setDataWeek1} setDataWeek2={setDataWeek2} />}
                    </Drawer.Screen>
                    <Drawer.Screen name="Setari" component={SettingsScreen} />
                    <Drawer.Screen name="Examene" component={ExamsScreen} />

                </Drawer.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
};
