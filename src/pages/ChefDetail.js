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
import ChefData from "../data/chef_data.json";
import RatingStars from "../components/RatingStars";
import { Entypo } from "@expo/vector-icons";

export default function ChefDetail({ route }) {
  const { chefId } = route.params;

  const deviceWidth = Dimensions.get("window").width;

  const deviceHeight = Dimensions.get("window").height;

  const [loading, setLoading] = useState(true);

  const [countryCode, setCountryCode] = useState(""); // [String

  const [chef, setChef] = useState({});

  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  useEffect(() => {
    ChefData.chefs.map((chef) => {
      if (chef.id === chefId) {
        setChef(chef);
        console.log(chef.specialties);
        setLoading(false);
      }
    });
  }, []);

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
          source={{ uri: chef.imageSrc }}
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
            height: deviceHeight,
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
              {chef.name}
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
              <CountryFlag isoCode={chef.countryCode} size={25} />
            </View>
          </View>
          <RatingStars rating={chef.rating} />
          {chef.specialties.map((speciality, index) => {
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#545F5A",
              }}
            >
              {speciality}
            </Text>;
          })}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "#9E9E9E",
              }}
            >
              Chef's note
            </Text>
            <Entypo name="quote" size={20} color="#9E9E9E" />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "#545F5A",
            }}
          >
            {chef.bio}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
