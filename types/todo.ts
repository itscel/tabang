export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  // TODO: Add support for the following fields:
  // - description?: string;
  // - dueDate?: Date;
  // - priority?: 'low' | 'medium' | 'high';
  // - category?: string;
  // - tags?: string[];
  // - attachments?: { id: string; url: string; type: string }[];
  // - subtasks?: { id: string; title: string; completed: boolean }[];
}

export interface TodoFormData {
  title: string;
  // TODO: Add form fields for enhanced todo features
}
