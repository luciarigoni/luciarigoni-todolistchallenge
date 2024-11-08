import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import BoredScreen from "../screens/BoredScreen";

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
        tabBarActiveTintColor: "#FF90B3", // Cor do ícone ativo
        tabBarInactiveTintColor: "gray", // Cor do ícone inativo
        tabBarStyle: {
          backgroundColor: "#000000", // Fundo escuro para contraste
        },
        tabBarItemStyle: {
          paddingTop: 10,
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
