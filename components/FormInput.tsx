import React from "react";
import { Text, TextInput, View, TextInputProps } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues>
  extends Omit<TextInputProps, "value" | "onChangeText"> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  secureTextEntry,
  ...props
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">
            {label}
          </Text>
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            className={`w-full px-4 py-3 rounded-lg bg-white border ${
              error ? "border-red-500" : "border-gray-200"
            } focus:border-blue-500`}
            {...props}
          />
          {error && (
            <Text className="mt-1 text-xs text-red-500">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}
