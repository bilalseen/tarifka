import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import AntDesignIcons from "react-native-vector-icons/AntDesign";

export default function ChefCard({ item }) {
  const { width, height } = Dimensions.get("window");
  return (
    <View
      style={{
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <Image
        source={{ uri: item.imageSrc }}
        style={{
          width: width / 3,
          height: width / 3,
          resizeMode: "cover",
          borderRadius: 10,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: -10,
          right: -5,
          elevation: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          padding: 5,
          borderRadius: 10,
          gap: 5,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.rating}</Text>
        <AntDesignIcons name="star" size={25} color="#FFD700" />
      </View>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
    </View>
  );
}
