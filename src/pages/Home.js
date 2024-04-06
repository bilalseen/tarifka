import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import CategoryCard from "../components/CategoryCard";
import { useFetch } from "../hooks/useFetch/useFetch";

export default function Home({ navigation }) {
  const { data, error, loading } = useFetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  const handleMealList = (categoryName) => {
    navigation.navigate("MealList", { categoryName });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loading]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <FlatList
          data={data.categories}
          renderItem={({ item }) => (
            <CategoryCard
              category={item}
              navigateToMeals={() => handleMealList(item.strCategory)}
            />
          )}
          keyExtractor={(item) => item.idCategory.toString()} // Ensure key is a string
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFA500",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    justifyContent: "center",
  },
  categoryContainer: {
    flex: 1,
    marginTop: 20,
  },
});
