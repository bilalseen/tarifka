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
import ChefCard from "../components/ChefCard";
import chefData from "../data/chef_data.json";

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
        paddingHorizontal: 10,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
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
        <View style={{ gap: 30, marginTop: 40 }}>
          <View>
            <Text
              style={{
                fontSize: 26,
                fontWeight: "bold",
                color: "#545F5A",
              }}
            >
              Categories
            </Text>
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
            <View style={{ gap: 10 }}>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "bold",
                  color: "#545F5A",
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
          <View
            style={{
              gap: 20,
            }}
          >
            <Text
              style={{
                fontSize: 26,
                fontWeight: "bold",
                color: "#545F5A",
              }}
            >
              The most popular chefs
            </Text>
            <FlatList
              data={chefData.chefs}
              renderItem={({ item }) => <ChefCard item={item} />}
              keyExtractor={(item) => item.name} // Her öğenin benzersiz bir anahtarı olduğunu varsayalım
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
