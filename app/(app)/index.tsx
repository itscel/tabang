import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTodo } from "../../contexts/TodoContext";
import { TodoItem } from "../../components/TodoItem";

export default function Home() {
  const [newTodo, setNewTodo] = useState("");
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodo();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo("");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "My Tasks",
          headerRight: () => (
            <Text className="text-sm font-medium text-gray-500">
              {todos.length} tasks
            </Text>
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 bg-gray-50 p-4">
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            )}
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
          />

          <View className="absolute bottom-4 left-4 right-4">
            <View className="flex-row items-center bg-white rounded-lg border border-gray-200 p-2">
              <TextInput
                value={newTodo}
                onChangeText={setNewTodo}
                placeholder="Add a new task..."
                className="flex-1 text-base px-2"
                returnKeyType="done"
                onSubmitEditing={handleAddTodo}
              />
              <TouchableOpacity
                onPress={handleAddTodo}
                disabled={!newTodo.trim()}
                className={`p-2 rounded-lg ${
                  newTodo.trim() ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
