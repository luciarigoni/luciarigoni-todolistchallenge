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

export default function BoredScreen() {
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
            "x-api-key": "ylX4blBYT9FaoVd6OhvR", // Substitua pela sua chave de API
          },
        }
      );
      const data = await response.json();
      setCatImage(data[0].url); // Obtém a URL de uma única imagem
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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Estou Entediado</Text>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Clique para se Inspirar!</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#4EA5D9" style={styles.loader} />
      ) : (
        <>
          {advice && (
            <View style={styles.adviceContainer}>
              <Text style={styles.adviceText}>Conselho do Dia:</Text>
              <Text style={styles.advice}>{advice}</Text>
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
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
  },
  button: {
    backgroundColor: "#4EA5D9",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
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
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
  },
  adviceText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  advice: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
  },
  catImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginTop: 20,
  },
});
