import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { ConsumedProvider } from "../src/context/ConsumedContext";
import { ProductProvider } from "../src/context/ProductContext";

export default function Layout() {
  return (
    <ProductProvider>
      <ConsumedProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 80,
              borderTopWidth: 0.5,
              borderTopColor: "#ddd",
              backgroundColor: "#fff",
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={26}
                  color={focused ? "black" : "#999"}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="add-product"
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name="add"
                  size={30}
                  color={focused ? "black" : "#999"}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="fridge"
            options={{
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  name="fridge"
                  size={26}
                  color={focused ? "black" : "#999"}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="consumed"
            options={{
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  name="chef-hat"
                  size={26}
                  color={focused ? "black" : "#999"}
                />
              ),
            }}
          />
        </Tabs>
      </ConsumedProvider>
    </ProductProvider>

  );
}
