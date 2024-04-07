import { View, Text, FlatList } from "react-native";
import React from "react";
import { useFetch } from "../hooks/useFetch/useFetch";
import MealCard from "../components/MealCard";

const MealList = ({ route, navigation }) => {
  const { categoryName } = route.params;
  const { data, error, loading } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );

  const navigateToMealDetail = (idMeal) => {
    navigation.navigate("MealDetail", { idMeal });
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FlatList
        data={data.meals}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            navigateToDetail={() => navigateToMealDetail(item.idMeal)}
          />
        )}
        keyExtractor={(item) => item.idMeal.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MealList;
