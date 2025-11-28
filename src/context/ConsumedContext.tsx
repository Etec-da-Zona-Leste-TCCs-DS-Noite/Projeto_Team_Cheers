import React, { createContext, useContext, useState } from "react";

type ConsumedProduct = {
  id: string;
  name: string;
  brand: string;
  expirationDate: string;
  consumedAt: string; 
};

type ConsumedContextType = {
  consumed: ConsumedProduct[];
  addConsumed: (product: ConsumedProduct) => void;
  removeConsumed: (id: string) => void;
};

const ConsumedContext = createContext<ConsumedContextType>({
  consumed: [],
  addConsumed: () => {},
  removeConsumed: () => {},
});

export function ConsumedProvider({ children }: { children: React.ReactNode }) {
  const [consumed, setConsumed] = useState<ConsumedProduct[]>([]);

  function addConsumed(product: ConsumedProduct) {
    setConsumed((prev) => [...prev, product]);
  }

  function removeConsumed(id: string) {
    setConsumed((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <ConsumedContext.Provider value={{ consumed, addConsumed, removeConsumed }}>
      {children}
    </ConsumedContext.Provider>
  );
}

export function useConsumed() {
  return useContext(ConsumedContext);
}
