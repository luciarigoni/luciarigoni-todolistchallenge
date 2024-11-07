import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import LottieAnimation from "../components/LottieAnimation";
import onboarding3 from "../assets/animations/onboarding3.json";

export default function OnboardingScreen1({ navigation }) {
  return (
    <View style={styles.container}>
      <LottieAnimation source={onboarding3} />
      <Text style={styles.text}>Welcome to our App!</Text>
      <Button title="Next" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
});
