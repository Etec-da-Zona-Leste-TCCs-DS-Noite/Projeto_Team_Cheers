import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RecipeCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Leite integral - Italac</Text>
      <Text style={styles.text}>
        Faça um pudim ou vitamina{"\n"}
        Use em receitas de bolo{"\n"}
        Prepare mingau
      </Text>
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
