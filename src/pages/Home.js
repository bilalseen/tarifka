import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import CategoryCard from "../components/CategoryCard";
import { useFetch } from "../hooks/useFetch/useFetch";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import RandomMealCard from "../components/RandomMealCard";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

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

  const navigateToMealDetail = (idMeal) => {
    navigation.navigate("MealDetail", { idMeal });
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FDFDFD",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 50,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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
            height: 200,
            paddingVertical: 20,
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
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {randomMealLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <Text
              style={{
                fontSize: 26,
                fontWeight: "bold",
                color: "#545F5A",
                paddingHorizontal: 20,
              }}
            >
              Meal of the day
            </Text>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <RandomMealCard
                meal={randomMealData.meals[0]}
                navigateToDetail={() =>
                  navigateToMealDetail(randomMealData.meals[0].idMeal)
                }
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
