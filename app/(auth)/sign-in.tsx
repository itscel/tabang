import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, router } from "expo-router";
import { FormInput } from "../../components/FormInput";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInForm) => {
    setIsLoading(true);
    try {
      // TODO: Implement your authentication logic here
      console.log("Sign in data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      router.replace("/(app)");
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-gray-900 mb-8">
          Welcome back
        </Text>

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
          placeholder="Enter your password"
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          className={`mt-6 rounded-lg py-4 px-6 ${
            isLoading ? "bg-blue-400" : "bg-blue-500"
          }`}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-semibold text-lg">
              Sign In
            </Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/(auth)/sign-up" className="text-blue-500 font-semibold">
            Sign Up
          </Link>
        </View>
      </View>
    </View>
  );
}
