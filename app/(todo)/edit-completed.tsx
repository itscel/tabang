import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
  StatusBar,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().optional(),
});

type TodoForm = z.infer<typeof todoSchema>;

export default function EditCompletedTodoScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // In a real app, you'd fetch the todo item based on the id
  // This is mock data
  const todoItem = {
    id: id || '1',
    title: "Complete project proposal",
    description: "Finish the draft by EOD",
    date: "2025-02-10",
    completed: true,
  };

  const { control, handleSubmit, formState: { errors } } = useForm<TodoForm>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todoItem.title,
      description: todoItem.description,
      date: todoItem.date,
    },
  });

  const onSubmit = (data: TodoForm) => {
    console.log("Updated todo:", { id, ...data });
    // Here you would update the todo in your state or database
    router.back();
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            console.log("Deleting todo:", id);
            // Here you would delete the todo from your state or database
            router.back();
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleIncomplete = () => {
    console.log("Marking todo as incomplete:", id);
    // Here you would update the todo's completion status to incomplete
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#3c82f6" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Task</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Title</Text>
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="What do you need to do?"
                    placeholderTextColor="#94A3B8"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.title && (
                <Text style={styles.errorText}>{errors.title.message}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Add details about the task"
                    placeholderTextColor="#94A3B8"
                    value={value}
                    onChangeText={onChange}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                )}
              />
            </View>

            {/* <View style={styles.inputContainer}>
              <Text style={styles.label}>Due Date</Text>
              <Controller
                control={control}
                name="date"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#94A3B8"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </View> */}

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.saveButtonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveButton, styles.incompleteButton]}
              onPress={handleIncomplete}
            >
              <Text style={styles.saveButtonText}>Incomplete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveButton, styles.deleteButton]}
              onPress={handleDelete}
            >
              <Text style={styles.saveButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
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
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1E293B",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  textArea: {
    height: 120,
    paddingTop: 16,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  saveButton: {
    backgroundColor: "#3B82F6", //#3B82F6 60a5fa
    padding: 18,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  incompleteButton: {
    marginTop: 8,
    backgroundColor: "#FACC15", //#FACC15 387ae3
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: "#EF4444", //#EF4444 245dda
  },
});
