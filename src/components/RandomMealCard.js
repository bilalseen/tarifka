import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import getCountryCode from "../components/functions/CountryCode";
import CountryFlag from "react-native-country-flag";

export default function RandomMealCard({ meal, navigateToDetail }) {
  const [countryCode, setCountryCode] = useState(""); // [String

  useEffect(() => {
    setCountryCode(getCountryCode(meal.strArea));
    console.log(countryCode);
  }, []);

  return (
    <Pressable onPress={navigateToDetail}>
      <View
        style={{
          width: (Dimensions.get("window").width / 10) * 9,
          height: Dimensions.get("window").height / 3,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <Image
          source={{ uri: meal.strMealThumb }}
          style={{
            width: (Dimensions.get("window").width / 10) * 9,
            height: Dimensions.get("window").height / 3,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            flexDirection: "row",
            backgroundColor: "#fff",
            minWidth: 100,
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            borderRadius: 50,
            gap: 5,
            elevation: 5,
          }}
        >
          <Icon name="star" size={15} color="#FCAF23" />
          <Text
            style={{
              fontSize: 12,
              color: "#000",
            }}
          >
            4.8(1k + Review)
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            alignItems: "center",
            justifyContent: "center",
            elevation: 5,
            // borderRadius: 5, will be added to border radius
          }}
        >
          <CountryFlag isoCode={countryCode} size={25} />
        </View>
        <View
          style={{
            position: "absolute",
            padding: 10,
            borderRadius: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            width: "100%",
            bottom: -10,
            paddingVertical: 5,
            backgroundColor: "#fff",
            gap: 5,
            elevation: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#5F5F5F",
              }}
            >
              {meal.strMeal}
            </Text>
            <FeatherIcon name="chevrons-up" size={30} color="#51A789" />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <MaterialIcon name="alarm" size={20} color="#EE5F2D" />
            <Text style={{ fontSize: 14, color: "rgb(99, 99, 99)" }}>
              35 min
            </Text>
            <Text style={{ fontSize: 14, color: "rgb(99, 99, 99)" }}>easy</Text>
            <Text style={{ fontSize: 14, color: "rgb(99, 99, 99)" }}>
              by frederico
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
