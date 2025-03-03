import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
      </Stack>
    </>
  );
}
