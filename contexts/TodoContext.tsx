import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Todo } from "../types/todo";
import { todoService, TodoItem } from "../services/api";
import { useAuth } from "./AuthContext";

// This context provides todo management functionality across the app
interface TodoContextType {
  todos: Todo[];
  activeTodos: Todo[];
  completedTodos: Todo[];
  isLoading: boolean;
  error: string | null;
  addTodo: (title: string, description: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  refreshTodos: () => Promise<void>;
}

// Create context with undefined default value
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Convert API todo format to app todo format
const convertApiTodoToAppTodo = (apiTodo: TodoItem): Todo => {
  return {
    id: apiTodo.item_id.toString(),
    title: apiTodo.item_name,
    description: apiTodo.item_description,
    completed: apiTodo.status === "inactive",
    createdAt: new Date(apiTodo.timemodified),
  };
};

// Provider component that wraps app and provides todo functionality
export function TodoProvider({ children }: { children: ReactNode }) {
  // State to store todo items
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  // Load todos when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshTodos();
    } else {
      // Clear todos when user is not authenticated
      setTodos([]);
    }
  }, [isAuthenticated, user]);

  const refreshTodos = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Get active todos
      const activeTodosResponse = await todoService.getTodos(user.id, "active");
      
      // Get inactive (completed) todos
      const inactiveTodosResponse = await todoService.getTodos(user.id, "inactive");
      
      // Convert API todos to app format and combine them
      const activeTodos = Object.values(activeTodosResponse.data || {}).map(convertApiTodoToAppTodo);
      const inactiveTodos = Object.values(inactiveTodosResponse.data || {}).map(convertApiTodoToAppTodo);
      
      setTodos([...activeTodos, ...inactiveTodos]);
    } catch (e) {
      console.error("Failed to fetch todos:", e);
      setError("Failed to load your tasks. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new todo
  const addTodo = async (title: string, description: string) => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Add todo via API
      const response = await todoService.addTodo({
        item_name: title,
        item_description: description,
        user_id: user.id,
      });
      
      if (response.status === 200 && response.data) {
        // Add new todo to state
        const newTodo = convertApiTodoToAppTodo(response.data);
        setTodos((prev) => [newTodo, ...prev]);
      } else {
        throw new Error(response.message || "Failed to add task");
      }
    } catch (e) {
      console.error("Failed to add todo:", e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Failed to add task. Please try again.");
      }
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle todo completion status
  const toggleTodo = async (id: string) => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Find the todo to toggle
      const todoToToggle = todos.find((todo) => todo.id === id);
      if (!todoToToggle) throw new Error("Task not found");
      
      // Determine new status
      const newStatus = todoToToggle.completed ? "active" : "inactive";
      
      // Update todo status via API
      const response = await todoService.updateTodoStatus(parseInt(id), newStatus);
      
      if (response.status === 200) {
        // Update todo in state
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      } else {
        throw new Error(response.message || "Failed to update task status");
      }
    } catch (e) {
      console.error("Failed to toggle todo:", e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Failed to update task. Please try again.");
      }
      // Refresh todos to ensure state is in sync with server
      refreshTodos();
    } finally {
      setIsLoading(false);
    }
  };

  // Remove a todo
  const deleteTodo = async (id: string) => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Delete todo via API
      const response = await todoService.deleteTodo(parseInt(id));
      
      if (response.status === 200) {
        // Remove todo from state
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      } else {
        throw new Error(response.message || "Failed to delete task");
      }
    } catch (e) {
      console.error("Failed to delete todo:", e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Failed to delete task. Please try again.");
      }
      // Refresh todos to ensure state is in sync with server
      refreshTodos();
    } finally {
      setIsLoading(false);
    }
  };

  // Computed properties for active and completed todos
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <TodoContext.Provider 
      value={{ 
        todos, 
        activeTodos, 
        completedTodos, 
        isLoading, 
        error, 
        addTodo, 
        toggleTodo, 
        deleteTodo, 
        refreshTodos 
      }}
    >
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