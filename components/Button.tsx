import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
}

export const Button = ({
  onPress,
  title,
  isLoading = false,
  variant = "primary",
  className = "",
}: ButtonProps) => {
  const baseStyle = "w-full py-3 rounded-lg items-center justify-center";
  const variantStyles = {
    primary: "bg-primary",
    secondary: "bg-gray-100",
  };
  const textStyles = {
    primary: "text-white font-semibold",
    secondary: "text-gray-700 font-semibold",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === "primary" ? "white" : "#4B5563"}
        />
      ) : (
        <Text className={textStyles[variant]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
