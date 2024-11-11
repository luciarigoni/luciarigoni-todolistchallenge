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
  Alert,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Swipeable } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({
  navigation,
  taskItems,
  setTaskItems,
  isDarkMode,
  toggleTheme,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [modalVisible, setModalVisible] = useState(false);

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

  const deleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const updateTask = (index, updatedTask) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index] = updatedTask;
    setTaskItems(itemsCopy);
  };

  const openTaskDetails = (task, index) => {
    navigation.navigate("TaskDetails", { task, index, updateTask });
  };

  const handleFilterChange = (status) => {
    setFilter(status);
    setModalVisible(false);
  };

  const filteredTasks = taskItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "Todos" || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  const themeStyles = {
    backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
    color: isDarkMode ? "#FFFFFF" : "#000000",
    inputBackgroundColor: isDarkMode ? "#333333" : "#f0f0f0",
  };

  const renderRightActions = (index) => {
    return (
      <TouchableOpacity
        onPress={() => deleteTask(index)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    );
  };

  const getBackgroundColor = (status) => {
    switch (status) {
      case "Pendente":
        return "#FFD700";
      case "Em andamento":
        return "#1E90FF";
      case "Concluída":
        return "#32CD32";
      default:
        return themeStyles.inputBackgroundColor;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const handleNewTask = async () => {
        const newTask = await AsyncStorage.getItem("newTask");
        if (newTask) {
          const parsedTask = JSON.parse(newTask);
          setTaskItems([...taskItems, parsedTask]);
          await AsyncStorage.removeItem("newTask");
        }
      };
      handleNewTask();
    }, [taskItems])
  );

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

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[styles.filterButtonText, { color: themeStyles.color }]}>
            Filtrar: {filter}
          </Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {["Todos", "Pendente", "Em andamento", "Concluída"].map(
                (status) => (
                  <TouchableOpacity
                    key={status}
                    onPress={() => handleFilterChange(status)}
                  >
                    <Text style={styles.modalOption}>{status}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
        </Modal>

        <ScrollView style={styles.items}>
          {filteredTasks.map((item, index) => (
            <Swipeable
              key={index}
              renderRightActions={() => renderRightActions(index)}
            >
              <TouchableOpacity onPress={() => openTaskDetails(item, index)}>
                <View
                  style={[
                    styles.task,
                    { backgroundColor: getBackgroundColor(item.status) },
                  ]}
                >
                  <Text style={{ color: themeStyles.color }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </Swipeable>
          ))}
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("AddTask", { isDarkMode })}
          style={styles.addButtonPosition}
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
  filterButton: {
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: "bold",
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
    right: 20,
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
  deleteButton: {
    backgroundColor: "#ff5252",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "80%",
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalOption: {
    padding: 10,
    fontSize: 16,
    color: "#333333",
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
