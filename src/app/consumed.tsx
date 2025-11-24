import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import PeriodFilter from "../components/PeriodFilter";
import Header from "../components/Header";
import ConsumedCard from "../components/ConsumedCard";

type ConsumedItem = {
  id: string;
  name: string;
  brand: string;
  date: string; 
};

export default function Consumed() {
  const [period, setPeriod] = useState(7);
  const [items, setItems] = useState<ConsumedItem[]>([]);

  // 🔥 Mock inicial — depois isso será trocado por AsyncStorage ou backend
  useEffect(() => {
    setItems([
      {
        id: "1",
        name: "Farinha de trigo",
        brand: "Dona Benta",
        date: "08/12/2025",
      },
    ]);
  }, []);

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <Text style={styles.title}>Produtos Consumidos</Text>

        <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
          <PeriodFilter value={period} onChange={setPeriod} />
        </View>

        <View style={{ marginTop: 20 }}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            scrollEnabled={false} 
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <ConsumedCard
                name={item.name}
                brand={item.brand}
                date={item.date}
                onDelete={() => deleteItem(item.id)}
              />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 32,
    marginLeft: 16,
  },
});

