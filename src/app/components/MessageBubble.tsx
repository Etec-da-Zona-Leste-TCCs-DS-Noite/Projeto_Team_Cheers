import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  text: string;
  isUser?: boolean;
};

export default function MessageBubble({ text, isUser }: Props) {
  return (
    <View style={[styles.bubbleContainer, isUser ? styles.right : styles.left]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
        <Text style={[styles.text, isUser ? styles.userText : styles.botText]}>
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleContainer: {
    maxWidth: "80%",
    marginVertical: 4,
  },
  left: {
    alignSelf: "flex-start",
  },
  right: {
    alignSelf: "flex-end",
  },
  bubble: {
    padding: 10,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: "#FF7206",
    borderTopRightRadius: 4,
  },
  botBubble: {
    backgroundColor: "#F5F5F7",
    borderTopLeftRadius: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  userText: {
    color: "white",
  },
  botText: {
    color: "black",
  },
});
