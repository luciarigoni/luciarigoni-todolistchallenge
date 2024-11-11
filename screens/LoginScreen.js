import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/users");
      const user = response.data.users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        navigation.replace("HomeTabs");
      } else {
        Alert.alert(
          "Ops, o login falhou!",
          "Nome de usuário ou senha incorretos."
        );
      }
    } catch (error) {
      Alert.alert("Ops, aconteceu um erro!", "Tente novamente mais tarde.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleOne}></View>
      <View style={styles.circleTwo}></View>

      <Text style={styles.title}>Seja bem-vindo!</Text>
      <Text style={styles.subtitle}>Coloque seu e-mail e senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#a3a3a3"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#a3a3a3"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#7d7d7d",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#a3a3a3",
    marginBottom: 20,
    fontSize: 16,
    color: "#333333",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4d0039",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  circleOne: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "#ffcce6",
    borderRadius: 150,
    top: -50,
    left: -50,
  },
  circleTwo: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "#ffcce6",
    borderRadius: 150,
    bottom: -100,
    right: -50,
  },
});
