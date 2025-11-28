import { useFocusEffect, useNavigation } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../src/components/Header";
import InfoCard from "../../src/components/InfoCard";
import ProductCard from "../../src/components/ProductCard";
import { useConsumed } from "../../src/context/ConsumedContext";
import type { Product } from "../../src/context/ProductContext";
import { useProducts } from "../../src/context/ProductContext";
import { deleteProduct, getProducts } from "../../src/services/productStorage";



export default function Fridge() {
  const { removeProduct, consumeProduct } = useProducts();
  const { addConsumed } = useConsumed();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const navigation = useNavigation();

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleConsumed = () => {
    if (!selectedProduct) return;

    const consumedData = {
      ...selectedProduct,
      consumedAt: new Date().toISOString(), // salva o dia do consumo
    };

    addConsumed(consumedData);        // adiciona aos consumidos
    removeProduct(selectedProduct.id);  // remove da geladeira

    setModalVisible(false);
    Alert.alert("✅ Produto consumido");
  };

  const handleDelete = () => {
    if (!selectedProduct) return;

    deleteProduct(selectedProduct.id).then(() => {
      getProducts().then(setProducts);
    });

    setModalVisible(false);
    Alert.alert("❌ Produto excluído");
  };

  const countExpiring = products.filter((p) => {
    const [d, m, a] = p.expirationDate.split("/").map(Number);
    const exp = new Date(a, m - 1, d);

    exp.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diff = exp.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return days <= 7;
  }).length;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Screen is focused again');
      getProducts().then(setProducts);

    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <View style={styles.infoRow}>
          <InfoCard title="Total de Produtos" value={products.length} />
          <InfoCard title="Vencendo" value={countExpiring} />
        </View>

        <Text style={styles.sectionTitle}>Meus produtos</Text>

        {products.length === 0 && (
          <Text style={{ marginTop: 20, textAlign: "center", opacity: 0.6 }}>
            Nenhum produto adicionado ainda
          </Text>
        )}

        {products.map((product, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleProductPress(product)}
          >
            <ProductCard
              name={product.name}
              brand={product.brand}
              expirationDate={product.expirationDate}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>


      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {selectedProduct?.name ?? ""}
            </Text>
            <Text style={styles.modalBrand}>
              {selectedProduct?.brand ?? ""}
            </Text>
            <Text style={styles.modalExpiry}>
              Validade: {selectedProduct?.expirationDate ?? ""}
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

