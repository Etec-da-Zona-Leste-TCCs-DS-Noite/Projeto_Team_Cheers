import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import ConsumedCard from "../src/components/ConsumedCard";
import Header from "../src/components/Header";
import PeriodFilter from "../src/components/PeriodFilter";
import { useConsumed } from "../src/context/ConsumedContext";

type ConsumedItem = {
  id: string;
  name: string;
  brand: string;
  date: string;
};

export default function Consumed() {
  const { consumed } = useConsumed();
  const [period, setPeriod] = useState(7);
  const [items, setItems] = useState<ConsumedItem[]>([]);

  const filtered = consumed.filter(item => {
    const consumedDate = new Date(item.consumedAt);
    const today = new Date();

    const diff = today.getTime() - consumedDate.getTime();
    const days = diff / (1000 * 60 * 60 * 24);

    return days <= period;

  });



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

        <View style={{ marginTop: 20, paddingHorizontal: 16 }}>
          {filtered.length === 0 ? (
            <Text style={{ textAlign: "center", opacity: 0.6 }}>
              Nenhum produto consumido neste período.
            </Text>
          ) : (
            filtered.map((item) => (
              <ConsumedCard
                key={item.id}
                name={item.name}
                brand={item.brand}
                date={item.consumedAt}
                onDelete={() => deleteItem(item.id)}
              />
            ))
          )}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 32,
    marginLeft: 16,
  },
});

