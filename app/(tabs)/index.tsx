import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Sample todo data
const initialTodos = [
  { id: '1', title: 'ToDo Part 3', description: 'Make the rest of the UI', date: '2025-02-10' },
  { id: '2', title: 'Debate Position Paper', description: 'Add the gravity side for defending Lean and look for possible loopholes on the arguments', date: '2025-02-12' },
  { id: '3', title: 'Book Boat Ticket', description: 'To go home for Holy Week', date: '2025-02-15' },
];

export default function TodoTabScreen() {
  const router = useRouter();
  const [todos, setTodos] = useState(initialTodos);

  const handleAddTodo = () => {
    router.push("/(todo)/add-todo");
  };

  const handleEditTodo = (id: string) => {
    router.push({
      pathname: "/(todo)/edit-todo",
      params: { id }
    });
  };

  const handleCompleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id)); 
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const renderTodoItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.todoItem} 
      onPress={() => handleEditTodo(item.id)}
    >
      <View style={styles.todoContent}>
        <Text style={styles.todoTitle}>{item.title}</Text>
        <Text style={styles.todoDescription}>{item.description}</Text>
        {/* <Text style={styles.todoDate}>{item.date}</Text> */}
      </View>

      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => handleDeleteTodo(item.id)}
      >
        <Ionicons name="trash" size={20} color="#EF4444" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.checkButton} 
        onPress={() => handleCompleteTodo(item.id)}
      >
        <Ionicons name="checkmark" size={20} color="#3c82f6" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>My Tasks</Text>
        <View style={styles.placeholder} />
      </View>

    <FlatList
      data={todos}
      renderItem={renderTodoItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
    <View style={styles.emptyContainer}>
      <Image 
        source={require('../../assets/images/no-task.png')}  // Correct image path
        style={styles.emptyImage}
        resizeMode="contain"
      />
      <Text style={styles.emptyText}>No tasks left 🎉</Text>
    </View>
  }
/>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddTodo}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E293B",
  },
  listContainer: {
    padding: 16,
  },
  todoItem: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  todoContent: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  todoDescription: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 6,
  },
  todoDate: {
    fontSize: 12,
    color: "#94A3B8",
  },
  checkButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 200,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#64748B",
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
    alignItems: "center"
  },
  
});

