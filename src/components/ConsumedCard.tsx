import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  name: string;
  brand: string;
  date: string;
  onDelete: () => void;
};

export default function ConsumedCard({ name, brand, date, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.brand}>{brand}</Text>

        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={16} color="#000" />
          <Text style={styles.date}>
            {new Date(date).toLocaleDateString("pt-BR")}
          </Text>
        </View>
      </View>

      {/* <TouchableOpacity onPress={onDelete}>
        <Ionicons name="trash-outline" size={22} color="black" />
      </TouchableOpacity>*/}
    </View> 
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFB87A",
    padding: 16,
    borderRadius: 10,
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  brand: {
    fontSize: 14,
    marginTop: 4,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  date: {
    fontSize: 13,
  },
});
