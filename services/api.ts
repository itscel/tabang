// services/api.ts

const API_BASE_URL = "https://todo-list.dcism.org";

// Error interface
interface ApiError {
  status: number;
  message: string;
}

// Response interface
interface ApiResponse<T> {
  status: number;
  data?: T;
  message?: string;
  count?: string;
}

// Auth Types
export interface SignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface SignInResponse {
  id: number;
  fname: string;
  lname: string;
  email: string;
  timemodified: string;
}

export interface TodoItem {
  item_id: number;
  item_name: string;
  item_description: string;
  status: "active" | "inactive";
  user_id: number;
  timemodified: string;
}

// Auth Services
export const authService = {
  signUp: async (userData: SignUpData): Promise<ApiResponse<null>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup_action.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Sign up error:", error);
      throw {
        status: 500,
        message: "Network error. Please check your connection.",
      };
    }
  },

  signIn: async (email: string, password: string): Promise<ApiResponse<SignInResponse>> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/signin_action.php?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        {
          method: "GET",
        }
      );
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Sign in error:", error);
      throw {
        status: 500,
        message: "Network error. Please check your connection.",
      };
    }
  },
};

// Todo Services
export const todoService = {
  getTodos: async (userId: number, status: "active" | "inactive"): Promise<ApiResponse<TodoItem[]>> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/getItems_action.php?status=${status}&user_id=${userId}`,
        {
          method: "GET",
        }
      );
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get todos error:", error);
      throw {
        status: 500,
        message: "Network error. Please check your connection.",
      };
    }
  },

  addTodo: async (todo: { item_name: string; item_description: string; user_id: number }): Promise<ApiResponse<TodoItem>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/addItem_action.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Add todo error:", error);
      throw {
        status: 500,
        message: "Network error. Please check your connection.",
      };
    }
  },

  updateTodo: async (todo: { item_name: string; item_description: string; user_id: number }): Promise<ApiResponse<null>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/editItem_action.php`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Update todo error:", error);
      throw {
        status: 500,
        message: "Network error. Please check your connection.",
      };
    }
  },

  updateTodoStatus: async (itemId: number, status: "active" | "inactive"): Promise<ApiResponse<null>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/statusItem_action.php`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_id: itemId, status }),
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Update todo status error:", error);
      throw {
        status: 500,
        message: "Network error. Please check your connection.",
      };
    }
  },

  deleteTodo: async (itemId: number): Promise<ApiResponse<null>> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/deleteItem_action.php?item_id=${itemId}`,
        {
          method: "DELETE",
        }
      );
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Delete todo error:", error);
      throw {
        status: 500,
        message: "Network error. Please check your connection.",
      };
    }
  },
};