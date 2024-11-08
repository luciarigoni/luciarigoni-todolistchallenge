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

export default function HomeScreen({ navigation }) {
  const [taskItems, setTaskItems] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Carrega as tarefas do AsyncStorage ao montar a tela
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) {
          setTaskItems(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    };

    loadTasks();
  }, []);

  // Salva as tarefas no AsyncStorage sempre que a lista de tarefas é atualizada
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

  const addTask = (task) => {
    setTaskItems([...taskItems, task]);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const filteredTasks = taskItems.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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

        {/* Campo de busca de tarefa */}
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: themeStyles.inputBackgroundColor,
              color: themeStyles.color,
            },
          ]}
          placeholder="Buscar tarefas"
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
          onPress={() => navigation.navigate("AddTask", { addTask: addTask })}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    width: "100%",
    paddingHorizontal: 20,
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
