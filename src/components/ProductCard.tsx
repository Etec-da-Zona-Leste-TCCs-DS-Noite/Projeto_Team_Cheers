import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry"; 

type Props = {
  name: string;
  brand: string;
  expirationDate: string;
  remainingDays?: number;
};

export default function ProductCard({
  name,
  brand,
  expirationDate,
  remainingDays,
}: Props) {

  const exp = new Date(expirationDate);
  const today = new Date();


  const diffTime = exp.getTime() - today.getTime();
  const calculatedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

 const days =
    typeof remainingDays === "string"
      ? parseInt(remainingDays)
      : remainingDays ?? calculatedDays;

  const getBackgroundColor = () => {
    if (calculatedDays <= 7) return "#FF4D00";       
    if (calculatedDays <= 15) return "#FF8F3D";     
    return "#FFF";                          
  };

  return (
    <View style={[styles.card, { backgroundColor: getBackgroundColor() }]}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.brand}>{brand}</Text>

      <View style={styles.bottomRow}>
        <Text style={styles.expiry}>{expirationDate}</Text>
        {remainingDays && <Text style={styles.days}>{remainingDays}</Text>}
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
