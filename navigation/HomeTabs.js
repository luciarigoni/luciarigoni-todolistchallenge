import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import BoredScreen from "../screens/BoredScreen";
import { ThemeContext } from "../context/ThemeProvider";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Bored") {
            iconName = "happy";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "gray",

        tabBarItemStyle: {
          paddingTop: 10, // Adicione o valor desejado para o espaçamento superior
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Início" }}
      />
      <Tab.Screen
        name="Bored"
        component={BoredScreen}
        options={{ title: "Estou Entediado" }}
      />
    </Tab.Navigator>
  );
}
