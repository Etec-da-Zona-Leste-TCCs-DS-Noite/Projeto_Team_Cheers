import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Recipe } from "../context/RecipeContext";

export default function RecipeCard({ recipe = {} }: { recipe: Recipe }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{recipe.nome}</Text>
      <Text style={styles.text}>
        Ingredientes:
      </Text>
      {recipe.ingredientes?.map((ingrediente, index) => (
        <Text key={index} style={styles.text}>
          • {ingrediente}
        </Text>
      ))}
      <Text style={styles.text}>
        Passo a passo:
      </Text>
      {recipe.passo_a_passo?.map((passo, index) => (
        <Text key={index} style={styles.text}>
          {index + 1}. {passo}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    padding: 24,
    marginVertical: 16,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
});
