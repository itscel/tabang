import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TodoLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#ffffff" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "My Todos" }} />
        <Stack.Screen name="add" options={{ title: "Add Todo" }} />
        <Stack.Screen name="edit" options={{ title: "Edit Todo" }} />
        <Stack.Screen name="completed" options={{ title: "Completed Tasks" }} />
      </Stack>
    </>
  );
}
