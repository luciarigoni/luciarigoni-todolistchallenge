// HomeTabs.js
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import BoredScreen from "../screens/BoredScreen";
import GiftsScreen from "../screens/GiftsScreen";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const [taskItems, setTaskItems] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to add tasks
  const addTask = (task) => {
    setTaskItems([...taskItems, task]);
  };

  // Function to toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Bored") {
            iconName = "happy";
          } else if (route.name === "Gifts") {
            iconName = "gift";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: isDarkMode ? "#FFFFFF" : "#FF90B3",
        tabBarInactiveTintColor: isDarkMode ? "#888888" : "gray",
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        children={(props) => (
          <HomeScreen
            {...props}
            taskItems={taskItems}
            addTask={addTask}
            setTaskItems={setTaskItems}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        )}
        options={{ title: "Início" }}
      />
      <Tab.Screen
        name="Bored"
        children={(props) => <BoredScreen {...props} isDarkMode={isDarkMode} />}
        options={{ title: "Estou Entediado" }}
      />
      <Tab.Screen
        name="Gifts"
        children={(props) => (
          <GiftsScreen {...props} addTask={addTask} isDarkMode={isDarkMode} />
        )}
        options={{ title: "Presentes" }}
      />
    </Tab.Navigator>
  );
}
