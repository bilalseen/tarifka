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
  Linking,
} from "react-native";
import { useFetch } from "../hooks/useFetch/useFetch";
import Icon from "react-native-vector-icons/FontAwesome";
import CountryFlag from "react-native-country-flag";
import getCountryCode from "../components/functions/CountryCode";
import LottieView from "lottie-react-native";

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

  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    console.log(liked);
  };

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
          backgroundColor: "#FDFDFD",
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
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <ScrollView>
        <Image
          source={{ uri: data.meals[0].strMealThumb }}
          style={{
            width: deviceWidth,
            height: (deviceHeight / 3) * 2,
          }}
        />

        <View
          style={{
            position: "absolute",
            top: 50,
            right: 10,
            backgroundColor: "#fff",
            padding: 8,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            elevation: 5,
          }}
        >
          <TouchableOpacity style={{}} onPress={handleLike}>
            <Icon name="heart" size={30} color={liked ? "red" : "#E0E0E0"} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            // position: "absolute",
            // top: deviceHeight / 2,
            // width: deviceWidth,
            backgroundColor: "#fff",
            padding: 20,
            paddingTop: 40,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            gap: 10,
            elevation: 5,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
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
                showsHorizontalScrollIndicator={false}
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
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                padding: 8,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                elevation: 5,
                width: (deviceWidth / 5) * 4,
                height: 50,
              }}
              onPress={() =>
                Linking.openURL(data.meals[0].strYoutube).catch((err) =>
                  console.error("Couldn't load page", err)
                )
              }
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Watch on Youtube
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
