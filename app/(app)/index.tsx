import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
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
            <Text style={styles.taskCount}>{todos.length} tasks</Text>
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.container}>
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

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                value={newTodo}
                onChangeText={setNewTodo}
                placeholder="Add a new task..."
                style={styles.input}
                returnKeyType="done"
                onSubmitEditing={handleAddTodo}
              />
              <TouchableOpacity
                onPress={handleAddTodo}
                disabled={!newTodo.trim()}
                style={[
                  styles.addButton,
                  { backgroundColor: newTodo.trim() ? "#3B82F6" : "#D1D5DB" },
                ]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  taskCount: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  inputContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  addButton: {
    padding: 8,
    borderRadius: 8,
  },
});
