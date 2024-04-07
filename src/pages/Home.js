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
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesignIcons from "react-native-vector-icons/AntDesign";

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
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          marginTop: 100,
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "pink",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#545F5A",
            maxWidth: "60%",
          }}
        >
          Looking for your favourite meal.
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Ionicons name="notifications-outline" size={30} color="#000" />
          <AntDesignIcons name="search1" size={30} color="#000" />
        </View>
      </View>
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
          horizontal={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  loading: {
    justifyContent: "center",
  },
  categoryContainer: {
    flex: 1,
    marginTop: 20,
  },
});
