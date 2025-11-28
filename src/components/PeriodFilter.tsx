import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const options = [
  { label: "Últimos 7 dias", value: 7 },
  { label: "Últimas 2 semanas", value: 14 },
  { label: "Últimos 30 dias", value: 30 },
  { label: "Últimos 90 dias", value: 90 },
];

type Props = {
  value: number;
  onChange: (v: number) => void;
};

export default function PeriodFilter({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setOpen(!open)}
      >
        <Text style={styles.selectorText}>
          {options.find((o) => o.value === value)?.label}
        </Text>
        <Ionicons name="chevron-down" size={18} color="black" />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          {options.map((o) => (
            <TouchableOpacity
              key={o.value}
              style={styles.dropdownItem}
              onPress={() => {
                onChange(o.value);
                setOpen(false);
              }}
            >
              <Text style={styles.dropdownText}>{o.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selector: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 170,
  },
  selectorText: {
    fontSize: 14,
    fontWeight: "500",
  },
  dropdown: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "white",
    width: 180,
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownText: {
    fontSize: 14,
  },
});
