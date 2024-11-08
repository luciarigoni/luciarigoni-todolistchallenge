import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Switch,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddTask = () => {
    if (task.trim()) {
      Keyboard.dismiss();
      setTaskItems([...taskItems, task]);
      setTask("");
      a;
    }
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
    buttonBackgroundColor: isDarkMode ? "#bb86fc" : "#92DCE5",
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
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: themeStyles.inputBackgroundColor,
              color: themeStyles.color,
            },
          ]}
          placeholder="Escreva uma tarefa"
          placeholderTextColor={isDarkMode ? "#aaaaaa" : "#555555"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View
            style={[
              styles.addWrapper,
              { backgroundColor: themeStyles.buttonBackgroundColor },
            ]}
          >
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
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  tasksWrapper: {
    flex: 1,
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
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
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "75%",
    borderRadius: 60,
  },
  addWrapper: {
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
