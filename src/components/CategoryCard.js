import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ToastAndroid,
  Vibration,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
export default function CategoryCard({ category, navigateToMeals }) {
  const { strCategory } = category;

  return (
    <Pressable onPress={navigateToMeals}>
      <View style={styles.container}>
        <Image
          source={{ uri: category.strCategoryThumb }}
          style={styles.image}
        />
        <Text style={styles.text}>{strCategory}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: Dimensions.get("window").height / 9,
    width: Dimensions.get("window").width / 3,
    margin: 10,
    marginTop: 50,
    gap: 20,
    borderRadius: 10,
    borderColor: "#BCAAA4",
    borderWidth: 1,
  },
  text: {
    position: "absolute",
    bottom: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: Dimensions.get("window").height / 10 - 10,
    position: "absolute",
    top: -40,
    borderRadius: 50,
  },
});
