import './app/languages/i18n';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import "react-native-gesture-handler";
import * as React from "react";
import { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import HomeScreen from "./app/screens/Home/HomeScreen";
import SettingsScreen from "./app/screens/SettingsScreen";
import ChoosePage from "./app/screens/ChoosePage";
import ExamsScreen from "./app/screens/ExamsScreen";
import { ThemeProvider } from "./app/context/ThemeContext";
import { ScheduleProvider } from "./app/context/ScheduleContext";
import { ColorsProvider } from "./app/context/ColorsContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { enableScreens } from 'react-native-screens';

const Drawer = createDrawerNavigator();
enableScreens();

function MainApp() {
  const { t } = useTranslation();

  useEffect(() => {
    const fetchStoredLanguage = async () => {
      try {
        const storedLang = await AsyncStorage.getItem('userLanguage');
        if (storedLang) {
          i18n.changeLanguage(storedLang);
        }
      } catch (error) {
        console.log('Error loading language:', error);
      }
    };
    fetchStoredLanguage();
  }, []);

  return (
    <NavigationContainer>
      <ThemeProvider>
        <ScheduleProvider>
          <ColorsProvider>
            <Drawer.Navigator
              initialRouteName="Acasa"
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#3f51b5",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                headerTitleAlign: "center",
              }}>
              <Drawer.Screen
                name={t('home_page.top_title')}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                  ),
                }}>
                {(props) => <HomeScreen {...props} />}
              </Drawer.Screen>
              <Drawer.Screen
                name={t('choose_page.top_title')}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="calendar" color={color} size={size} />
                  ),
                }}>
                {(props) => <ChoosePage {...props} />}
              </Drawer.Screen>
              <Drawer.Screen
                name={t('settings_page.top_title')}
                component={SettingsScreen}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="cog" color={color} size={size} />
                  ),
                }}
              />
              <Drawer.Screen
                name={t('exam_page.top_title')}
                component={ExamsScreen}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="book" color={color} size={size} />
                  ),
                }}
              />
            </Drawer.Navigator>
          </ColorsProvider>
        </ScheduleProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <React.Suspense fallback={<Text>Loading...</Text>}>
        <MainApp />
      </React.Suspense>
    </GestureHandlerRootView>
  );
}
