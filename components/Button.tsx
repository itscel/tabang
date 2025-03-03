import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
}

export const Button = ({
  onPress,
  title,
  isLoading = false,
  variant = "primary",
  style,
}: ButtonProps) => {
  const variantStyle =
    variant === "primary" ? styles.primary : styles.secondary;
  const textStyle =
    variant === "primary" ? styles.primaryText : styles.secondaryText;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      style={[styles.base, variantStyle, style]}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === "primary" ? "white" : "#4B5563"}
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: "#0EA5E9", // Assuming this is your primary color
  },
  secondary: {
    backgroundColor: "#F3F4F6",
  },
  primaryText: {
    color: "white",
    fontWeight: "600",
  },
  secondaryText: {
    color: "#374151",
    fontWeight: "600",
  },
});
