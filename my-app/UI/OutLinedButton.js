import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function OutLinedButton({ icon, onPress, children, futurestyle }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        futurestyle,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Ionicons style={styles.icon} name={icon} size={18} color="black" />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default OutLinedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  pressed: {
    opacity: 0.6,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: "black",
  },
});
