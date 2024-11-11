import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importe o AsyncStorage
import Ionicons from "react-native-vector-icons/Ionicons";

export default function AddTaskScreen({ navigation, route }) {
  const [task, setTask] = useState("");
  const isDarkMode = route.params.isDarkMode;

  const handleSaveTask = async () => {
    if (task.trim()) {
      Keyboard.dismiss();
      const newTask = {
        name: task,
        status: "Pendente",
        details: "",
        comments: "",
      };
      await AsyncStorage.setItem("newTask", JSON.stringify(newTask)); // Salva a nova tarefa
      navigation.goBack(); // Retorna à HomeScreen
    }
  };

  const themeStyles = {
    backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
    color: isDarkMode ? "#FFFFFF" : "#333333",
    inputBackgroundColor: isDarkMode ? "#333333" : "#f0f0f0",
    buttonBackgroundColor: isDarkMode ? "#4EA5D9" : "#4EA5D9",
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={40} color={themeStyles.color} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: themeStyles.color }]}>
        Adicionar Nova Tarefa
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: themeStyles.inputBackgroundColor,
            color: themeStyles.color,
          },
        ]}
        placeholder="Digite a tarefa"
        placeholderTextColor={isDarkMode ? "#aaaaaa" : "#555555"}
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TouchableOpacity
        style={[
          styles.saveButton,
          { backgroundColor: themeStyles.buttonBackgroundColor },
        ]}
        onPress={handleSaveTask}
      >
        <Ionicons name="checkmark" size={24} color="#FFFFFF" />
        <Text style={styles.saveButtonText}>Salvar Tarefa</Text>
      </TouchableOpacity>
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
  backButton: { position: "absolute", top: 70, left: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  saveButtonText: { color: "#FFFFFF", fontSize: 18, marginLeft: 10 },
});
