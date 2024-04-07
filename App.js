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
import i18n from './app/config/i18n';
import { useTranslation } from 'react-i18next';
import { LanguageProvider } from './app/config/LanguageContext';

export default function MyApp()  {
    const Drawer = createDrawerNavigator();
    const [DataWeek1, setDataWeek1] = useState([]);
    const [DataWeek2, setDataWeek2] = useState([]);
    const { t } = useTranslation(); // Access t function for translation


    return (
        <LanguageProvider>
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
                        name={t('Home')}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name={t("home")} color={color} size={size} />
                            ),
                        }}
                    >
                        {props => <HomeScreen {...props} DataWeek1={DataWeek1} DataWeek2={DataWeek2} />}
                    </Drawer.Screen>
                    <Drawer.Screen
                        name={t('Choose Schedule')}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="calendar" color={color} size={size} />
                            ),
                        }}
                    >
                        {props => <ChoosePage {...props} setDataWeek1={setDataWeek1} setDataWeek2={setDataWeek2} />}
                    </Drawer.Screen>
                    <Drawer.Screen
                        name={t('Settings')}
                        component={SettingsScreen}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="cog" color={color} size={size} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name={t('Exams')}
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
    </LanguageProvider>
    );
};