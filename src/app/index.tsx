import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import PrimaryButton from "../components/PrimaryButton";
import RecipeCard from "../components/RecipeCard";
import { useProducts } from "../context/ProductContext";


export default function Index() {
  const { products } = useProducts();

  const countExpiring = products.filter((p) => {
    const [d, m, a] = p.expirationDate.split("/").map(Number);
    const exp = new Date(a, m - 1, d);

    exp.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diff = exp.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return days <= 7;
  }).length;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <Image
          source={require("../../assets/imagens/hero-banner.png")}
          style={styles.banner}
        />

        <View style={styles.cardsContainer}>
          <InfoCard title="Total de Produtos" value={products.length} />
          <InfoCard title="Vencendo" value={countExpiring} />
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
