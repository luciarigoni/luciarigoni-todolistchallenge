import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";

export default function BoredScreen({ isDarkMode }) {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [catImage, setCatImage] = useState(null);

  const handleButtonPress = () => {
    Alert.alert(
      "Dica!",
      "Que tal se inspirar com um conselho? 😊",
      [
        {
          text: "OK",
          onPress: () => {
            fetchAdvice();
            fetchCatImage();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) {
        throw new Error("Erro na resposta da API");
      }
      const data = await response.json();
      setAdvice(data.slip.advice);
    } catch (error) {
      console.error("Erro ao buscar o conselho:", error);
      Alert.alert(
        "Erro",
        "Não foi possível buscar um conselho agora. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCatImage = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search",
        {
          headers: {
            "x-api-key": "ylX4blBYT9FaoVd6OhvR", // Replace with your API key
          },
        }
      );
      const data = await response.json();
      setCatImage(data[0].url);
    } catch (error) {
      console.error("Erro ao buscar a imagem do gato:", error);
      Alert.alert(
        "Erro",
        "Não foi possível buscar a imagem de um gatinho agora. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const themeStyles = {
    backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
    textColor: isDarkMode ? "#FFFFFF" : "#333333",
    adviceBackgroundColor: isDarkMode ? "#333333" : "#f0f0f0",
    buttonBackgroundColor: isDarkMode ? "#4EA5D9" : "#4EA5D9",
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <View style={[styles.circle, styles.redCircle]} />
      <View style={[styles.circle, styles.greenCircle]} />
      <View style={[styles.circle, styles.redCircleSmaller]} />
      <View style={[styles.circle, styles.greenCircleSmaller]} />

      <Text style={[styles.text, { color: themeStyles.textColor }]}>
        Estou Entediado
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: themeStyles.buttonBackgroundColor },
        ]}
        onPress={handleButtonPress}
      >
        <Text style={styles.buttonText}>Clique para se Inspirar!</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#4EA5D9" style={styles.loader} />
      ) : (
        <>
          {advice && (
            <View
              style={[
                styles.adviceContainer,
                { backgroundColor: themeStyles.adviceBackgroundColor },
              ]}
            >
              <Text
                style={[styles.adviceText, { color: themeStyles.textColor }]}
              >
                Conselho do Dia:
              </Text>
              <Text style={[styles.advice, { color: themeStyles.textColor }]}>
                {advice}
              </Text>
            </View>
          )}
          {catImage && (
            <Image source={{ uri: catImage }} style={styles.catImage} />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  loader: {
    marginTop: 20,
  },
  adviceContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },
  adviceText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  advice: {
    fontSize: 16,
    textAlign: "center",
  },
  catImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginTop: 20,
    resizeMode: "cover",
  },
  circle: {
    position: "absolute",
    borderRadius: 100,
    opacity: 0.2,
  },
  redCircle: {
    width: 200,
    height: 200,
    backgroundColor: "#FF6347",
    top: -50,
    right: -70,
  },
  greenCircle: {
    width: 150,
    height: 150,
    backgroundColor: "#32CD32",
    bottom: -30,
    left: -60,
  },
  redCircleSmaller: {
    width: 100,
    height: 100,
    backgroundColor: "#FF6347",
    top: 120,
    left: -40,
  },
  greenCircleSmaller: {
    width: 120,
    height: 120,
    backgroundColor: "#32CD32",
    bottom: 80,
    right: -40,
  },
});
