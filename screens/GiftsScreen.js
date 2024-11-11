import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
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
      <View style={[styles.circle, styles.redCircle]} />
      <View style={[styles.circle, styles.greenCircle]} />
      <View style={[styles.circle, styles.redCircleSmaller]} />
      <View style={[styles.circle, styles.greenCircleSmaller]} />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 20,
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
    elevation: 3,
  },
  productImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  productName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  circle: {
    position: "absolute",
    borderRadius: 100,
    opacity: 0.2,
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
