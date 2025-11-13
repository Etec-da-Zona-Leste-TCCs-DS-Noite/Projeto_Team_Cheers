import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Header from "../components/Header";
import MessageBubble from "../components/MessageBubble";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Me dê uma ideia de receita com leite, maça e cenoura, que seja saudável sem açúcar.",
      isUser: true,
    },
    {
      id: "2",
      text: "Perfeito! Aqui vai uma receita saudável, sem açúcar e super nutritiva:\n\nVitamina Natural de Maçã e Cenoura:",
      isUser: false,
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    // Aqui futuramente pode chamar a API de IA para gerar respostas automáticas
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Header />
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageBubble text={item.text} isUser={item.isUser} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />

      <ScrollView contentContainerStyle={styles.content}>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mensagem..."
          placeholderTextColor="#828282"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={handleSend}>
          <Ionicons name="send-outline" size={24} color="#828282" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginRight: 10,
    color: "black",
  },
});
