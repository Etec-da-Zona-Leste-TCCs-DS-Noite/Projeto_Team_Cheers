import React, { createContext, useContext, useState } from "react";
import { useConsumed } from "./ConsumedContext";

export type Product = {
    id: string;
    name: string;
    brand: string;
    expirationDate: string;
    unitMeasure: string;
    quantity: string;
};

type ProductContextType = {
    products: Product[];
    addProduct: (product: Product) => void;
    removeProduct: (id: string) => void;
    consumeProduct: (product: Product) => void;
};

const ProductContext = createContext<ProductContextType>({
    products: [],
    addProduct: () => { },
    removeProduct: () => { },
    consumeProduct: () => { },
});

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const { addConsumed } = useConsumed();

    function addProduct(product: Product) {
        setProducts((prev) => [...prev, product]);
    }

    function removeProduct(id: string) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    }

    function consumeProduct(product: Product) {
        const consumedData = {
            ...product,
            consumedAt: new Date().toISOString(),
        };

        addConsumed(consumedData);
        removeProduct(product.id);
    }

    return (
        <ProductContext.Provider value={{ products, addProduct, removeProduct, consumeProduct }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    return useContext(ProductContext);
}
