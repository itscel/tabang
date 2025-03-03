import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, router } from "expo-router";
import { FormInput } from "../../components/FormInput";

const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    setIsLoading(true);
    try {
      // TODO: Implement your registration logic here
      console.log("Sign up data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      router.replace("/(app)");
    } catch (error) {
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create account</Text>

        <FormInput
          control={control}
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          autoCapitalize="words"
        />

        <FormInput
          control={control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormInput
          control={control}
          name="password"
          label="Password"
          placeholder="Create a password"
          secureTextEntry
        />

        <FormInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          style={[styles.button, isLoading && styles.buttonDisabled]}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/(auth)/sign-in" style={styles.link}>
            Sign In
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 32,
  },
  button: {
    marginTop: 24,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#3B82F6",
  },
  buttonDisabled: {
    backgroundColor: "#60A5FA",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: "#4B5563",
  },
  link: {
    color: "#3B82F6",
    fontWeight: "600",
  },
});
