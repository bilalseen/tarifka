import React, { useState } from "react";
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

export default function MealCard({ meal, navigateToDetail }) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <Pressable onPress={navigateToDetail}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          margin: 15,
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
            <MaterialIcon name="online-prediction" size={30} color="#51A789" />
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
