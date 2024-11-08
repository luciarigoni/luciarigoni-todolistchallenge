import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

export default function BoredScreen() {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleButtonPress = () => {
    Alert.alert(
      "Dica!",
      "Que tal se inspirar com um conselho? 😊",
      [
        {
          text: "OK",
          onPress: () => fetchAdvice(), // Chama a função para buscar o conselho após clicar em "OK"
        },
      ],
      { cancelable: true }
    );
  };

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      // Usei a URL da Advice API para obter um conselho
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) {
        throw new Error("Erro na resposta da API");
      }
      const data = await response.json();
      setAdvice(data.slip.advice); // Conselho recebido da API
    } catch (error) {
      console.error("Erro ao buscar o conselho:", error); // Log de erro para depuração
      Alert.alert(
        "Erro",
        "Não foi possível buscar um conselho agora. Tente novamente mais tarde."
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
        advice && (
          <View style={styles.adviceContainer}>
            <Text style={styles.adviceText}>Conselho do Dia:</Text>
            <Text style={styles.advice}>{advice}</Text>
          </View>
        )
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
});
