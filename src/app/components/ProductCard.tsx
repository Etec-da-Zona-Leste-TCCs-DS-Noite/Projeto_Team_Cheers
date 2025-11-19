import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  name: string;
  brand: string;
  expiry: string;
  daysLeft?: string;
  color?: string;
};

export default function ProductCard({
  name,
  brand,
  expiry,
  daysLeft,
  color = "#FFF",
}: Props) {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.brand}>{brand}</Text>

      <View style={styles.bottomRow}>
        <Text style={styles.expiry}>{expiry}</Text>
        {daysLeft && <Text style={styles.days}>{daysLeft}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    alignSelf: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    opacity: 0.8,
    fontWeight: "600",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  expiry: {
    fontSize: 12,
    opacity: 0.8,
    fontWeight: "600",
  },
  days: {
    fontSize: 12,
    opacity: 0.8,
    fontWeight: "600",
  },
});
