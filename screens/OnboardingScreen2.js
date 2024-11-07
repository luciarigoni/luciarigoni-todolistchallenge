import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import LottieAnimation from "../components/LottieAnimation";
import onboarding4 from "../assets/animations/onboarding4.json";

export default function OnboardingScreen1({ navigation }) {
  return (
    <View style={styles.container}>
      <LottieAnimation source={onboarding4} />
      <Text style={styles.text}>Welcome to our App!</Text>
      <Button title="Next" onPress={() => navigation.navigate("Onboarding3")} />
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
