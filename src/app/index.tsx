import React from "react";
import { View, ScrollView, Text, Image, StyleSheet } from "react-native";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import RecipeCard from "../components/RecipeCard";
import PrimaryButton from "../components/PrimaryButton";

export default function Index() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <Image
          source={require("../../assets/imagens/hero-banner.png")}
          style={styles.banner}
        />

        <View style={styles.cardsContainer}>
          <InfoCard title="Total de Produtos" value={0} />
          <InfoCard title="Vencendo" value={0} />
        </View>

        <Text style={styles.sectionTitle}>Receitas</Text>
        <RecipeCard />

        <PrimaryButton label="Buscar receitas" onPress={() => { }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  banner: {
    width: "100%",
    height: 155,
    marginTop: 16,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 40,
    marginLeft: 16,
  },
});
