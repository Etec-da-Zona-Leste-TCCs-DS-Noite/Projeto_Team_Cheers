import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Modal, TouchableOpacity, Alert } from "react-native";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import ProductCard from "../components/ProductCard";

export default function Fridge() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleConsumed = () => {
    setModalVisible(false);
    Alert.alert("✅ Produto consumido");
  };

  const handleDelete = () => {
    setModalVisible(false);
    Alert.alert("❌ Produto excluído");
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <View style={styles.infoRow}>
          <InfoCard title="Total de Produtos" value={3} />
          <InfoCard title="Vencendo" value={1} />
        </View>

        <Text style={styles.sectionTitle}>Meus produtos</Text>

        <TouchableOpacity
          onPress={() =>
            handleProductPress({
              name: "Leite integral",
              brand: "Italac",
              expiry: "08/10/2025",
            })
          }
        >
          <ProductCard
            name="Leite integral"
            brand="Italac"
            expiry="08/10/2025"
            daysLeft="3 dias"
            color="#FF4D00"
          />
        </TouchableOpacity>

        
        <TouchableOpacity
          onPress={() =>
            handleProductPress({
              name: "Leite integral",
              brand: "Italac",
              expiry: "08/10/2025",
            })
          }
        >
          <ProductCard
            name="Leite integral"
            brand="Italac"
            expiry="08/10/2025"
            daysLeft="7 dias"
            color="#FF8F3D"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            handleProductPress({
              name: "Farinha de trigo",
              brand: "Dona Benta",
              expiry: "08/12/2025",
            })
          }
        >
          <ProductCard
            name="Farinha de trigo"
            brand="Dona Benta"
            expiry="08/12/2025"
            color="rgba(255, 186, 120, 0.45)"
          />
        </TouchableOpacity>
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {selectedProduct ? selectedProduct.name : ""}
            </Text>
            <Text style={styles.modalBrand}>
              {selectedProduct ? selectedProduct.brand : ""}
            </Text>
            <Text style={styles.modalExpiry}>
              Validade: {selectedProduct ? selectedProduct.expiry : ""}
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.button, styles.consumed]} onPress={handleConsumed}>
                <Text style={styles.buttonText}>Produto consumido</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.delete]} onPress={handleDelete}>
                <Text style={styles.buttonText}>Excluir produto</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 32,
    marginLeft: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    width: "80%",
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  modalBrand: {
    fontSize: 16,
    color: "gray",
  },
  modalExpiry: {
    fontSize: 14,
    marginVertical: 10,
    color: "#444",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  consumed: {
    backgroundColor: "#FF8F3D",
  },
  delete: {
    backgroundColor: "#FF4D00",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  closeText: {
    marginTop: 16,
    color: "#FF7206",
    fontWeight: "500",
  },
});

