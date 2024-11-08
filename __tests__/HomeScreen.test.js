import React from "react";
import { render } from "@testing-library/react-native";
import HomeScreen from "../src/screens/HomeScreen";

describe("HomeScreen", () => {
  it("renders correctly", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("Natal Perfeito")).toBeTruthy();
  });
});
