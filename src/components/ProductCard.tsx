import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  name: string;
  brand: string;
  expirationDate: string;
  remainingDays?: number;
};

function parseBRDate(dateString: string) {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
}

export default function ProductCard({
  name,
  brand,
  expirationDate,
  remainingDays,
}: Props) {

  const exp = parseBRDate(expirationDate);
  const today = new Date();

  exp.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  let diffTime = exp.getTime() - today.getTime();
  let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const getBackgroundColor = () => {
    if (days <= 7) return "#FF4D00";       
    if (days <= 15) return "#FF8F3D";     
    return "#FFF";                          
  };

  return (
    <View style={[styles.card, { backgroundColor: getBackgroundColor() }]}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.brand}>{brand}</Text>

      <View style={styles.bottomRow}>
        <Text style={styles.expiry}>{expirationDate}</Text>
        <Text style={styles.days}>{days} dias</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    padding: 16,
    marginVertical: 8,
    alignSelf: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
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
