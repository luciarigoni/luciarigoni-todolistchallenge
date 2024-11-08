// GiftsScreen.js
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

export default function GiftsScreen({ addTask, isDarkMode }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = (productName) => {
    addTask(productName);
    Alert.alert("Sucesso", `${productName} foi adicionado na sua lista!`);
  };

  const themeStyles = {
    backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
    textColor: isDarkMode ? "#FFFFFF" : "#000000",
    buttonBackgroundColor: isDarkMode ? "#333333" : "#92DCE5",
    buttonBorderColor: isDarkMode ? "#FFFFFF" : "#000000",
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[
          styles.safeArea,
          { backgroundColor: themeStyles.backgroundColor },
        ]}
      >
        <ActivityIndicator size="large" color="#4EA5D9" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.productContainer,
              { backgroundColor: themeStyles.buttonBackgroundColor },
            ]}
          >
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.productImage}
            />
            <Text
              style={[styles.productName, { color: themeStyles.textColor }]}
            >
              {item.title}
            </Text>
            <TouchableOpacity
              style={[
                styles.addButton,
                {
                  backgroundColor: themeStyles.buttonBackgroundColor,
                  borderColor: themeStyles.buttonBorderColor,
                },
              ]}
              onPress={() => handleAddProduct(item.title)}
            >
              <Text
                style={[styles.addButtonText, { color: themeStyles.textColor }]}
              >
                Adicionar
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  productName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  addButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    borderWidth: 2,
  },
  addButtonText: {
    fontWeight: "bold",
  },
});
