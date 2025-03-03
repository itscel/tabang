import React from "react";
import { Stack } from "expo-router";
import { TodoProvider } from "../contexts/TodoContext";

export default function RootLayout() {
  return (
    <TodoProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </TodoProvider>
  );
}
