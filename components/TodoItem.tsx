import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onToggle(todo.id)}
        style={styles.toggleContainer}
      >
        <View
          style={[
            styles.checkbox,
            todo.completed
              ? styles.checkboxCompleted
              : styles.checkboxUncompleted,
          ]}
        >
          {todo.completed && (
            <Ionicons name="checkmark" size={16} color="white" />
          )}
        </View>
        <Text
          style={[
            styles.title,
            todo.completed ? styles.titleCompleted : styles.titleUncompleted,
          ]}
        >
          {todo.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onDelete(todo.id)}
        style={styles.deleteButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxUncompleted: {
    borderColor: "#D1D5DB",
  },
  checkboxCompleted: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  titleUncompleted: {
    color: "#111827",
  },
  titleCompleted: {
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  deleteButton: {
    marginLeft: 16,
    padding: 8,
  },
});
