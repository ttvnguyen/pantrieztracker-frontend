import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from "react-native";

import { black, white, orange } from "../helper/Color";
// import TVShowScreen from "../screen/TVShowScreen";
import PantryScreen from "../screen/PantryScreen";
import WebViewScreen from "../screen/WebViewScreen";

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Pantry"
      drawerType={"slide"}
      drawerStyle={{ width: "50%", backgroundColor: black }}
      drawerContentOptions={{
        activeBackgroundColor: "transparent",
        activeTintColor: orange,
        inactiveTintColor: white,
      }}
    >
      <Drawer.Screen
        name="Pantry"
        component={PantryScreen}
        options={{
          drawerLabel: ({ color, focused }) => CustomDrawerStyle(color, focused, "Pantry"),
        }}
      />
      <Drawer.Screen
        name="Recipes"
        component={WebViewScreen}
        options={{
          drawerLabel: ({ color, focused }) => CustomDrawerStyle(color, focused, "Recipes"),
        }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerStyle = (color, focused, title) => {
  return (
    <Text
      style={{
        fontSize: focused ? 20 : 16,
        fontWeight: null,
        color: color,
        fontFamily: focused ? "Montserrat-Bold" : "Montserrat-Light",
      }}
    >
      {title}
    </Text>
  );
};

export default HomeDrawerNavigator;
