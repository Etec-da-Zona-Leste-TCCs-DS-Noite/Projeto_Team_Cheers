import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../src/components/Header";
import InfoCard from "../src/components/InfoCard";
import PrimaryButton from "../src/components/PrimaryButton";
import RecipeCard from "../src/components/RecipeCard";
import { Product } from "../src/context/ProductContext";
import { Recipe } from "../src/context/RecipeContext";
import { getProducts } from "../src/services/productStorage";
import { fetchRecipes } from "../src/services/RecipeService";


export default function Index() {
  // const { products } = useProducts();
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [countExpiring, setCountExpiring] = React.useState(0);

  useEffect(() => {
    const expiring = products.filter((p) => {
      const [d, m, a] = p.expirationDate.split("/").map(Number);
      const exp = new Date(a, m - 1, d);

      exp.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const diff = exp.getTime() - today.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

      return days <= 7;
    }).length;

    setCountExpiring(expiring);
  }, [products]);

  React.useEffect(() => {

    getProducts().then(setProducts);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <Image
          source={require("../assets/imagens/hero-banner.png")}
          style={styles.banner}
        />

        <View style={styles.cardsContainer}>
          <InfoCard title="Total de Produtos" value={products.length} />
          <InfoCard title="Vencendo" value={countExpiring} />
        </View>

        <Text style={styles.sectionTitle}>Receitas</Text>

        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}

        <PrimaryButton label="Buscar receitas" onPress={() => {
          fetchRecipes(products).then((receitas) => setRecipes(receitas));
        }} />
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
