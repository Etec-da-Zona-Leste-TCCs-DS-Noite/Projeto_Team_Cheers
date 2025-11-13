import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  title: string;
  value: number;
};

export default function InfoCard({ title, value }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 130,
    borderRadius: 8,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },
  value: {
    fontSize: 40,
    fontWeight: "600",
  },
});
