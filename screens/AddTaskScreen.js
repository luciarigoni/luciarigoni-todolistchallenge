import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function AddTaskScreen({ navigation, route }) {
  const [task, setTask] = useState("");

  const handleSaveTask = () => {
    if (task.trim()) {
      Keyboard.dismiss();
      // Chama a função passada via props para adicionar a tarefa na HomeScreen
      route.params.addTask(task);
      navigation.goBack(); // Volta para a HomeScreen após salvar a tarefa
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Nova Tarefa</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a tarefa"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
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
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4EA5D9",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginLeft: 10,
  },
});
