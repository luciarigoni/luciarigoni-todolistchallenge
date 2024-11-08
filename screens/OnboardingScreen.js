import React from "react";
import { StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import LottieAnimation from "../components/LottieAnimation";
import tree from "../assets/animations/tree.json";
import cat from "../assets/animations/cat.json";
import onboarding3 from "../assets/animations/onboarding3.json";

export default function OnboardingScreen({ navigation }) {
  return (
    <Onboarding
      onSkip={() => navigation.replace("Home")}
      onDone={() => navigation.replace("Home")}
      pages={[
        {
          backgroundColor: "#fff",
          image: <LottieAnimation source={tree} />,
          title: "Welcome to our App!",
          subtitle: "Discover all the features we offer!",
        },
        {
          backgroundColor: "#fdeb93",
          image: <LottieAnimation source={cat} />,
          title: "Explore More!",
          subtitle: "Find amazing features and tools.",
        },
        {
          backgroundColor: "#fdeb93",
          image: <LottieAnimation source={onboarding3} />,
          title: "Explore More!",
          subtitle: "Find amazing features and tools.",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({});
