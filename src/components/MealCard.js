import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from "react-native";

export default function MealCard({ meal, navigateToDetail }) {
  return (
    <Pressable onPress={navigateToDetail}>
      <View style={styles.container}>
        <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
        <Text style={styles.title}>{meal.strMeal} </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 10,
  },
  loading: {
    justifyContent: "center",
  },
  image: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height / 4,
    borderRadius: 10,
  },
  title: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: "100%",
    textAlign: "right",
    bottom: 0,
    paddingVertical: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
