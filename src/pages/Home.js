import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import CategoryCard from "../components/CategoryCard";
import { useFetch } from "../hooks/useFetch/useFetch";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import RandomMealCard from "../components/RandomMealCard";

export default function Home({ navigation }) {
  const { data, error, loading } = useFetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  const {
    data: randomMealData,
    loading: randomMealLoading,
    error: randomMealError,
  } = useFetch("https://www.themealdb.com/api/json/v1/1/random.php");

  const handleMealList = (categoryName) => {
    navigation.navigate("MealList", { categoryName });
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FDFDFD",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FDFDFD",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 100,
        gap: 20,
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 26,
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
      <View
        style={{
          backgroundColor: "pink",
          height: 200,
          marginTop: 20,
        }}
      >
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
      <View>
        {randomMealLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <RandomMealCard meal={randomMealData.meals[0]} />
        )}
      </View>
    </View>
  );
}
