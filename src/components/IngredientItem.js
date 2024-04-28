import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function IngredientItem({ ingredient, measure }) {
  const [checked, setChecked] = useState(false);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <TouchableOpacity onPress={() => setChecked(!checked)}>
        {checked ? (
          <Feather name="check-square" size={24} color="black" />
        ) : (
          <Feather name="square" size={24} color="black" />
        )}
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Text
          style={{
            textDecorationLine: checked ? "line-through" : "none",
          }}
        >
          {ingredient} - {measure}
        </Text>
      </View>
    </View>
  );
}
