import React from "react";
import {
  Text,
  TextInput,
  View,
  TextInputProps,
  StyleSheet,
} from "react-native";
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
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            style={[
              styles.input,
              error ? styles.inputError : styles.inputDefault,
            ]}
            {...props}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
  },
  inputDefault: {
    borderColor: "#E5E7EB",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: "#EF4444",
  },
});
