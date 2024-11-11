import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
      await AsyncStorage.setItem("newTask", JSON.stringify(newTask));
      navigation.goBack();
    }
  };

  const themeStyles = {
    backgroundColor: isDarkMode ? "#1c1c1c" : "#F5F5F5",
    color: isDarkMode ? "#FFFFFF" : "#333333",
    inputBackgroundColor: isDarkMode ? "#333333" : "#FFFFFF",
    buttonBackgroundColor: isDarkMode ? "#4EA5D9" : "#4EA5D9",
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      {/* Bolas decorativas de fundo */}
      <View style={[styles.circle, styles.redCircle]} />
      <View style={[styles.circle, styles.greenCircle]} />
      <View style={[styles.circle, styles.redCircleSmaller]} />
      <View style={[styles.circle, styles.greenCircleSmaller]} />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={32} color={themeStyles.color} />
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
        placeholder="Digite o título da tarefa"
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
        activeOpacity={0.8}
      >
        <Ionicons
          name="checkmark"
          size={24}
          color="#FFFFFF"
          style={styles.icon}
        />
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
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },

  circle: {
    position: "absolute",
    borderRadius: 100,
    opacity: 0.3,
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
