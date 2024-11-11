import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import HomeTabs from "./HomeTabs";
import AddTaskScreen from "../screens/AddTaskScreen";
import GiftsScreen from "../screens/GiftsScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
      <Stack.Screen name="Gifts" component={GiftsScreen} />
    </Stack.Navigator>
  );
}
