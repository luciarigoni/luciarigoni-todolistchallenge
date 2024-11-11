import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
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
        numColumns={2} // Define duas colunas na lista
        key={"two-columns"} // Força uma nova renderização com a chave fixa
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
          </View>
        )}
        columnWrapperStyle={styles.columnWrapper} // Estilo para espaçamento entre as colunas
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  productContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 5,
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
});
