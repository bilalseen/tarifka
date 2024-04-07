import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useFetch } from "../hooks/useFetch/useFetch";
import Icon from "react-native-vector-icons/FontAwesome";
import CountryFlag from "react-native-country-flag";
import getCountryCode from "../components/functions/CountryCode";

export default function MealDetail({ route }) {
  const { idMeal } = route.params;

  const deviceWidth = Dimensions.get("window").width;

  const deviceHeight = Dimensions.get("window").height;

  const [mealData, setMealData] = useState([]); // [[Object
  const [strInstructions, setStrInstructions] = useState(""); // [String

  const [countryCode, setCountryCode] = useState(""); // [String
  const [mealTags, setMealTags] = useState([]); // [String

  const { data, error, loading } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );

  useEffect(() => {
    if (data && data.meals && data.meals.length > 0) {
      setCountryCode(getCountryCode(data.meals[0].strArea));
      setMealData(data.meals[0]);

      if (data.meals[0].strTags) {
        setMealTags(data.meals[0].strTags.split(","));
      }

      data.meals[0].strInstructions = data.meals[0].strInstructions.replace(
        /\r\n/g,
        "\n"
      );
      setStrInstructions(data.meals[0].strInstructions);
    }
  }, [data]);
  const RenderItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          padding: 5,
          backgroundColor: "#fff",
          borderRadius: 10,
          width: 100,
          elevation: 3,
          borderColor: "#fff",
          borderWidth: 1,
          margin: 5,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#FFA500",
            textAlign: "center",
          }}
        >
          {item}
        </Text>
      </View>
    );
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
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={{ uri: data.meals[0].strMealThumb }}
        style={{
          width: deviceWidth,
          height: (deviceHeight / 3) * 2,
        }}
      />
      <TouchableOpacity style={{ position: "absolute", top: 50, right: 20 }}>
        <View
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 50,
            elevation: 5,
          }}
        >
          <Icon name="heart" size={30} color="#E0E0E0" />
        </View>
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          top: deviceHeight / 2,
          width: deviceWidth,
          backgroundColor: "#fff",
          padding: 20,
          paddingTop: 40,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          gap: 10,
          elevation: 5,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#545F5A",
              maxWidth: deviceWidth - 100,
            }}
          >
            {data.meals[0].strMeal}
          </Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 25,
              overflow: "hidden",
              elevation: 5,
              borderRadius: 5,
            }}
          >
            <CountryFlag isoCode={countryCode} size={25} />
          </View>
        </View>

        {mealTags.length > 0 ? (
          <View style={{ flexDirection: "row", gap: 10 }}>
            <FlatList
              data={mealTags}
              renderItem={({ item, index }) => (
                <RenderItem item={item} index={index} />
              )}
              horizontal={true}
            />
          </View>
        ) : null}
        <Text style={{ fontSize: 26, fontWeight: "bold", color: "#545F5A" }}>
          About Recipe
        </Text>
        {strInstructions.split("\n").map((instruction, index) => (
          <Text
            key={index}
            style={{
              fontSize: 16,
              color: "#545F5A",
              textAlign: "justify",
              lineHeight: 25,
            }}
          >
            {instruction}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
}
