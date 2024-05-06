import { View, Text } from "react-native";
import React from "react";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

export default function RatingStars({ rating }) {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      {Array.from({ length: 5 }).map((_, index) =>
        index < rating ? (
          <AntDesignIcon key={index} name="star" size={25} color={"#FFD700"} />
        ) : (
          <AntDesignIcon key={index} name="staro" size={25} color={"#FFD700"} />
        )
      )}
    </View>
  );
}
