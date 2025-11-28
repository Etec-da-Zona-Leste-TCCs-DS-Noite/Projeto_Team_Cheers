import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import { Product } from "../context/ProductContext";

const STORAGE_KEY = "products";

// Get all products
export async function getProducts(): Promise<Product[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Save all products
async function saveProducts(products: Product[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// Create product WITH automatic ID generation
export async function addProduct(product: Omit<Product, "id">): Promise<Product> {
  const products = await getProducts();

  const newProduct: Product = {
    id: uuidv4(),
    ...product,
  };

  products.push(newProduct);
  await saveProducts(products);

  return newProduct;
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id) || null;
}

// Update product
export async function updateProduct(updated: Product): Promise<void> {
  const products = await getProducts();

  const newList = products.map((p) =>
    p.id === updated.id ? updated : p
  );

  await saveProducts(newList);
}

// Delete product
export async function deleteProduct(id: string): Promise<void> {
  const products = await getProducts();
  const newList = products.filter((p) => p.id !== id);
  await saveProducts(newList);
}

// Clear all
export async function clearProducts(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
