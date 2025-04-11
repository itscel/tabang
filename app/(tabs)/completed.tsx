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

const initialCompletedTodos = [
  { id: '4', title: 'Research market trends', description: 'Analyze industry data for Q1 report', date: '2025-01-28', completed: true },
  { id: '5', title: 'Update documentation', description: 'Add new features to user manual', date: '2025-02-01', completed: true },
  { id: '6', title: 'Prepare presentation', description: 'Stakeholder meeting slides', date: '2025-02-05', completed: true },
  { id: '7', title: 'Research market trends', description: 'Analyze industry data for Q1 report', date: '2025-01-28', completed: true },
  { id: '8', title: 'Update documentation', description: 'Add new features to user manual', date: '2025-02-01', completed: true },
  { id: '9', title: 'Prepare presentation', description: 'Stakeholder meeting slides', date: '2025-02-05', completed: true },
  { id: '10', title: 'Research market trends', description: 'Analyze industry data for Q1 report', date: '2025-01-28', completed: true },
  { id: '11', title: 'Update documentation', description: 'Add new features to user manual', date: '2025-02-01', completed: true },
  { id: '12', title: 'Prepare presentation', description: 'Stakeholder meeting slides', date: '2025-02-05', completed: true },
];

export default function CompletedTodoScreen() {
  const router = useRouter();
  const [completedTodos, setCompletedTodos] = useState(initialCompletedTodos);

  const handleEditTodo = (id: string) => {
    router.push({
      pathname: "/(todo)/edit-completed",
      params: { id }
    });
  };

  const handleDeleteTodo = (id: string) => {
    setCompletedTodos(completedTodos.filter(todo => todo.id !== id));
  };

  const renderCompletedTodoItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.todoItem} onPress={() => handleEditTodo(item.id)}>
      <View style={styles.todoContent}>
        <Text style={styles.todoTitle}>{item.title}</Text>
        <Text style={styles.todoDescription}>{item.description}</Text>
        {/* <Text style={styles.todoDate}>{item.date}</Text> */}
      </View>

      <TouchableOpacity 
        style={styles.iconButton}
        onPress={() => handleDeleteTodo(item.id)}
      >
        <Ionicons name="trash" size={20} color="#F87171" />
      </TouchableOpacity>

      <View style={styles.iconButton}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={12} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#3c82f6" />
        </TouchableOpacity>
        <Text style={styles.title}>Completed Tasks</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={completedTodos}
        renderItem={renderCompletedTodoItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Image 
                    source={require('../../assets/images/no-completed-task.png')}  // Correct image path
                    style={styles.emptyImage}
                    resizeMode="contain"
                  />
            <Text style={styles.emptyText}>No completed tasks</Text>
            <Text style={styles.emptySubText}>Complete a task to see it here</Text>
          </View>
        }
      />
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
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
  },
  placeholder: {
    width: 40,
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
    shadowOffset: { width: 0, height: 1 },
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
    color: "#64748B",
    marginBottom: 4,
    textDecorationLine: "line-through",
  },
  todoDescription: {
    fontSize: 14,
    color: "#94A3B8",
    marginBottom: 6,
  },
  todoDate: {
    fontSize: 12,
    color: "#CBD5E1",
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#60a5fa",
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
    alignItems: "center"
  },
});
