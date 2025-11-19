import React from "react";
import { View, StyleSheet } from "react-native";

export default function BottomNav() {
  return <View style={styles.nav} />;
}

const styles = StyleSheet.create({
  nav: {
    height: 80,
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    backgroundColor: "white",
  },
});
