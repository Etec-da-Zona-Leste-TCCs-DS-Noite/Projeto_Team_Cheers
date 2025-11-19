import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [date, setDate] = useState("");
  const [expiry, setExpiry] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAdd = () => {
    console.log({ name, brand, date, expiry });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <Image
          source={require("../../assets/imagens/hero-banner.png")}
          style={styles.banner}
        />

        <Text style={styles.title}>Adicionar Produtos</Text>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.form}>
              <InputField
                label="Nome do Produto"
                placeholder="Ex.: Leite Integral"
                value={name}
                onChangeText={setName}
              />
              <InputField
                label="Marca"
                placeholder="Ex.: Italac"
                value={brand}
                onChangeText={setBrand}
              />
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <InputField
                  label="Data de Validade"
                  placeholder="dd/mm/aaaa"
                  value={date}
                  editable={false} 
                />
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={date ? new Date(date) : new Date()} 
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      const formatted = selectedDate.toLocaleDateString("pt-BR");
                      setDate(formatted); 
                    }
                  }}
                />
              )}
              <InputField
                label="Quantidade"
                placeholder="Ex.: 2 litros"
                value={expiry}
                onChangeText={setExpiry}
              />

              <PrimaryButton label="Adicionar" onPress={handleAdd} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    width: "100%",
    height: 155,
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 32,
    marginLeft: 16,
  },
  form: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 16,
  },
});
