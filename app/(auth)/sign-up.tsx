import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
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
    <View className="flex-1 bg-white p-6">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-gray-900 mb-8">
          Create account
        </Text>

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
          className={`mt-6 rounded-lg py-4 px-6 ${
            isLoading ? "bg-blue-400" : "bg-blue-500"
          }`}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-semibold text-lg">
              Sign Up
            </Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/(auth)/sign-in" className="text-blue-500 font-semibold">
            Sign In
          </Link>
        </View>
      </View>
    </View>
  );
}
