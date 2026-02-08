export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
