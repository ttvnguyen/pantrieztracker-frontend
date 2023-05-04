/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
// import SplashScreen from "react-native-splash-screen";

import PantryUpdateScreen from "./src/screen/PantryUpdateScreen";
// import SearchScreen from "./src/screen/SearchScreen.js0";
import HomeDrawerNavigator from "./src/navigator/HomeDrawerNavigator";


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerShown: false,
      }}
    >     
      <Stack.Screen name="Home" component={HomeDrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="PantryUpdate" component={PantryUpdateScreen} />
      {/* <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          gestureDirection: "vertical",
        }}
      /> */}
    </Stack.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    // SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
