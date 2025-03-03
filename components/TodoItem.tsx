import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <View className="flex-row items-center justify-between bg-white p-4 mb-2 rounded-lg border border-gray-100">
      <TouchableOpacity
        onPress={() => onToggle(todo.id)}
        className="flex-row items-center flex-1"
      >
        <View
          className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${
            todo.completed ? "bg-blue-500 border-blue-500" : "border-gray-300"
          }`}
        >
          {todo.completed && (
            <Ionicons name="checkmark" size={16} color="white" />
          )}
        </View>
        <Text
          className={`text-base flex-1 ${
            todo.completed ? "text-gray-400 line-through" : "text-gray-900"
          }`}
        >
          {todo.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onDelete(todo.id)}
        className="ml-4 p-2"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );
}
