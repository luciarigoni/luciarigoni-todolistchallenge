import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";

export default function TaskDetailsScreen({ route, navigation }) {
  const { task, index, updateTask } = route.params;

  const [status, setStatus] = useState(task.status || "Pendente");
  const [details, setDetails] = useState(task.details || "");
  const [comments, setComments] = useState(task.comments || "");
  const [modalVisible, setModalVisible] = useState(false); // Controle do modal

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    const updatedTask = { ...task, status, details, comments };
    updateTask(index, updatedTask);
    navigation.goBack();
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Tarefa</Text>

      <Text style={styles.label}>Status</Text>
      <TouchableOpacity
        style={styles.statusButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.statusButtonText}>{status}</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => handleStatusChange("Pendente")}>
              <Text style={styles.modalOption}>Pendente</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleStatusChange("Em andamento")}
            >
              <Text style={styles.modalOption}>Em andamento</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStatusChange("Concluída")}>
              <Text style={styles.modalOption}>Concluída</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.label}>Detalhes</Text>
      <TextInput
        style={styles.input}
        placeholder="Inclua detalhes da tarefa"
        value={details}
        onChangeText={setDetails}
        multiline
      />

      <Text style={styles.label}>Comentários</Text>
      <TextInput
        style={styles.input}
        placeholder="Adicione comentários"
        value={comments}
        onChangeText={setComments}
        multiline
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    paddingTop: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  statusButton: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  statusButtonText: {
    fontSize: 16,
    color: "#333333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#cccccc",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
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
});
