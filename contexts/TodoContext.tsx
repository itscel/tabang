import React, { createContext, useContext, useState, ReactNode } from "react";
import { Todo } from "../types/todo";

// This context provides todo management functionality across the app
interface TodoContextType {
  todos: Todo[]; // Array of todo items
  addTodo: (title: string) => void; // Adds a new todo
  toggleTodo: (id: string) => void; // Toggles todo completion status
  deleteTodo: (id: string) => void; // Removes a todo
  // TODO: Add functionality for todo categories/tags
  // TODO: Add todo priority levels
  // TODO: Add due dates for todos
  // TODO: Add todo search and filtering
  // TODO: Add todo sorting options
}

// Create context with undefined default value
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Provider component that wraps app and provides todo functionality
export function TodoProvider({ children }: { children: ReactNode }) {
  // State to store todo items
  const [todos, setTodos] = useState<Todo[]>([]);

  // Add a new todo to the beginning of the list
  const addTodo = (title: string) => {
    // TODO: Implement backend API integration for creating todos
    // TODO: Add offline support and data synchronization
    const newTodo: Todo = {
      id: Date.now().toString(), // Generate unique ID
      title,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [newTodo, ...prev]); // Add to start of list
  };

  // Toggle the completed status of a todo
  const toggleTodo = (id: string) => {
    // TODO: Implement backend API integration for updating todo status
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Remove a todo from the list
  const deleteTodo = (id: string) => {
    // TODO: Implement backend API integration for deleting todos
    // TODO: Add confirmation dialog before deletion
    // TODO: Add undo delete functionality
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

// Custom hook to use todo context
export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
}
