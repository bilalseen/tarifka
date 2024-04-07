import { View, Text, Pressable, Dimensions, Image } from "react-native";
import React from "react";
export default function CategoryCard({ category, navigateToMeals }) {
  const { strCategory } = category;

  return (
    <Pressable onPress={navigateToMeals}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          height: Dimensions.get("window").height / 9,
          width: Dimensions.get("window").width / 3,
          margin: 10,
          marginTop: 50,
          gap: 20,
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <Image
          source={{ uri: category.strCategoryThumb }}
          style={{
            width: 100,
            height: Dimensions.get("window").height / 10 - 10,
            position: "absolute",
            top: -40,
            borderRadius: 50,
          }}
        />
        <Text
          style={{
            position: "absolute",
            bottom: 20,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {strCategory}
        </Text>
      </View>
    </Pressable>
  );
}
