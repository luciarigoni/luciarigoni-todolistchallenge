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
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.replace("Login")}
      pages={[
        {
          backgroundColor: "#FF90B3",
          image: <LottieAnimation source={tree} />,
          title: "Bem-vindo ao Natal Perfeito!!",
          subtitle: "Prepare-se para organizar o melhor Natal de todos.",
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: "#2274A5",
          image: <LottieAnimation source={cat} />,
          title: "Não se esqueça de nada!",
          subtitle:
            "Com nosso app, você pode planejar cada detalhe das suas tarefas natalinas.",
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: "#BC2C1A",
          image: <LottieAnimation source={onboarding3} />,
          title: "Organize suas tarefas de Natal",
          subtitle: "De presentes a preparativos – tudo em um só lugar!",
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 10,
  },
});
