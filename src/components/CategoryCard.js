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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    backgroundColor: "#fff",
    height: Dimensions.get("window").height / 10,
    width: Dimensions.get("window").width - 20,
    margin: 10,
    paddingLeft: 20,
    gap: 20,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: "#BCAAA4",
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: Dimensions.get("window").height / 10 - 10,
  },
});
