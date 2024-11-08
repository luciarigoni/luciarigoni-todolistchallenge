// HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Switch,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({
  navigation,
  taskItems,
  addTask,
  setTaskItems,
  isDarkMode,
  toggleTheme,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem("tasks");
        if (savedTasks) {
          setTaskItems(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    };

    loadTasks();
  }, []);

  // Save tasks to AsyncStorage when taskItems changes
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(taskItems));
      } catch (error) {
        console.error("Erro ao salvar tarefas:", error);
      }
    };

    saveTasks();
  }, [taskItems]);

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const filteredTasks = taskItems.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const themeStyles = {
    backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
    color: isDarkMode ? "#FFFFFF" : "#000000",
    inputBackgroundColor: isDarkMode ? "#333333" : "#f0f0f0",
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <View style={styles.tasksWrapper}>
        <View style={styles.header}>
          <Text style={[styles.sectionTitle, { color: themeStyles.color }]}>
            Natal Perfeito
          </Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>

        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: themeStyles.inputBackgroundColor,
              color: themeStyles.color,
            },
          ]}
          placeholder="Buscar tarefas ou presentes"
          placeholderTextColor={isDarkMode ? "#aaaaaa" : "#555555"}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />

        <ScrollView style={styles.items}>
          {filteredTasks.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <View
                style={[
                  styles.task,
                  { backgroundColor: themeStyles.inputBackgroundColor },
                ]}
              >
                <Text style={{ color: themeStyles.color }}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddTask", { addTask, isDarkMode })
          }
          style={styles.addButtonPosition} // Alinha o botão à direita
        >
          <View style={styles.addWrapper}>
            <Ionicons name="add" size={24} color={themeStyles.color} />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  tasksWrapper: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  searchInput: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  items: {
    marginTop: 10,
    flex: 1,
  },
  task: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 30,
    right: 20, // Define a posição do botão à direita
    alignItems: "flex-end",
  },
  addButtonPosition: {
    alignSelf: "flex-end",
  },
  addWrapper: {
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92DCE5",
  },
});
