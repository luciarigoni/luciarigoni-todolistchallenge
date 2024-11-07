// src/components/LottieAnimation.js
import React from "react";
import LottieView from "lottie-react-native";

const LottieAnimation = ({ source }) => (
  <LottieView
    source={source}
    autoPlay
    loop
    style={{ width: 300, height: 300 }}
  />
);

export default LottieAnimation;
