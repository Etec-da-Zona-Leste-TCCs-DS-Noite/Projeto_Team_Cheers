import React from "react";
import { View, Text, TextInput, StyleSheet,TextInputProps } from "react-native";

type Props = {
  label: string;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
} & TextInputProps;

export default function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  ...rest
}: Props) {
  return (
    <View style={[styles.container, rest.style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#B3B3B3"
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#1E1E1E",
    marginBottom: 8,
  },
  input: {
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1E1E1E",
  },
});
