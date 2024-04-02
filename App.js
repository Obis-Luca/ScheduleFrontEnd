import { MaterialCommunityIcons } from '@expo/vector-icons'; // import the icon library
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
import LinearGradient from 'react-native-linear-gradient';

export default function MyApp()  {
    const Drawer = createDrawerNavigator();
    const [DataWeek1, setDataWeek1] = useState([]);
    const [DataWeek2, setDataWeek2] = useState([]);

    return (
        <ThemeProvider>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Acasa" screenOptions={{
                    headerStyle: {
                        backgroundColor: '#3f51b5',

                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',

                }}>
                    <Drawer.Screen
                        name="Acasa"
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="home" color={color} size={size} />
                            ),
                        }}
                    >
                        {props => <HomeScreen {...props} DataWeek1={DataWeek1} DataWeek2={DataWeek2} />}
                    </Drawer.Screen>
                    <Drawer.Screen
                        name="Alege orar"
                        options={{

                            drawerIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="calendar" color={color} size={size} />
                            ),
                        }}
                    >
                        {props => <ChoosePage {...props} setDataWeek1={setDataWeek1} setDataWeek2={setDataWeek2} />}
                    </Drawer.Screen>
                    <Drawer.Screen
                        name="Setari"
                        component={SettingsScreen}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="cog" color={color} size={size} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Examene"
                        component={ExamsScreen}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="book" color={color} size={size} />
                            ),
                        }}
                    />
                </Drawer.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
};