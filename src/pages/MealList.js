import { View, FlatList, Dimensions } from "react-native";
import React from "react";
import { useFetch } from "../hooks/useFetch/useFetch";
import MealCard from "../components/MealCard";
import LottieView from "lottie-react-native";

const MealList = ({ route, navigation }) => {
  const { categoryName } = route.params;

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;

  const { data, error, loading } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );

  const navigateToMealDetail = (idMeal) => {
    navigation.navigate("MealDetail", { idMeal });
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          height: deviceHeight,
        }}
      >
        <LottieView
          source={require("../../assets/animations/loading.json")}
          style={{ width: 400, height: 400 }}
          autoPlay
          loop
        />
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
